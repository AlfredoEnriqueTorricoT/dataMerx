<?php

namespace Tests\Feature;

use App\Models\Permission;
use App\Models\User;
use App\Models\UserPermission;
use App\Services\PermissionService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PermissionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Seed permissions
        $this->seedPermissions();
    }

    private function seedPermissions(): void
    {
        $permissions = [
            'platforms', 'users', 'watchs', 'modems',
            'sims', 'cars', 'mark_modems', 'responsability_admin', 'tags'
        ];

        foreach ($permissions as $name) {
            Permission::create(['name' => $name, 'details' => '_']);
        }
    }

    private function createUser(): User
    {
        return User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'privilege' => 1,
            'active' => 1,
        ]);
    }

    // ==========================================
    // GET USER PERMISSIONS TESTS
    // ==========================================

    public function test_get_user_permissions_returns_empty_array_when_no_permissions(): void
    {
        $user = $this->createUser();

        $response = $this->getJson("/api/user-permission/{$user->id}");

        $response->assertStatus(200)
            ->assertJson(['status' => 200])
            ->assertJsonPath('data', []);
    }

    public function test_get_user_permissions_returns_assigned_permissions(): void
    {
        $user = $this->createUser();
        $permission = Permission::where('name', 'modems')->first();

        UserPermission::create([
            'user_id' => $user->id,
            'permission_id' => $permission->id,
        ]);

        $response = $this->getJson("/api/user-permission/{$user->id}");

        $response->assertStatus(200)
            ->assertJsonPath('data.0.name', 'modems');
    }

    public function test_get_user_permissions_returns_multiple_permissions(): void
    {
        $user = $this->createUser();
        $permissions = ['modems', 'sims', 'cars'];

        foreach ($permissions as $permName) {
            $permission = Permission::where('name', $permName)->first();
            UserPermission::create([
                'user_id' => $user->id,
                'permission_id' => $permission->id,
            ]);
        }

        $response = $this->getJson("/api/user-permission/{$user->id}");

        $response->assertStatus(200);
        $this->assertCount(3, $response->json('data'));
    }

    // ==========================================
    // TOGGLE PERMISSION TESTS (CREATE/DELETE)
    // ==========================================

    public function test_toggle_permission_creates_permission_when_not_exists(): void
    {
        $user = $this->createUser();

        $response = $this->postJson('/api/user-permission', [
            'user_id' => $user->id,
            'permission' => 'modems',
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('user_permissions', [
            'user_id' => $user->id,
            'permission_id' => Permission::where('name', 'modems')->first()->id,
        ]);
    }

    public function test_toggle_permission_deletes_permission_when_exists(): void
    {
        $user = $this->createUser();
        $permission = Permission::where('name', 'modems')->first();

        UserPermission::create([
            'user_id' => $user->id,
            'permission_id' => $permission->id,
        ]);

        // Toggle again should delete
        $response = $this->postJson('/api/user-permission', [
            'user_id' => $user->id,
            'permission' => 'modems',
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseMissing('user_permissions', [
            'user_id' => $user->id,
            'permission_id' => $permission->id,
        ]);
    }

    public function test_toggle_permission_returns_error_for_invalid_permission(): void
    {
        $user = $this->createUser();

        $response = $this->postJson('/api/user-permission', [
            'user_id' => $user->id,
            'permission' => 'invalid_permission_name',
        ]);

        $response->assertStatus(432);
    }

    public function test_toggle_permission_returns_updated_permissions_list(): void
    {
        $user = $this->createUser();

        // Add first permission
        $this->postJson('/api/user-permission', [
            'user_id' => $user->id,
            'permission' => 'modems',
        ]);

        // Add second permission
        $response = $this->postJson('/api/user-permission', [
            'user_id' => $user->id,
            'permission' => 'sims',
        ]);

        $response->assertStatus(200);
        $this->assertCount(2, $response->json('data'));
    }

    // ==========================================
    // PERMISSION SERVICE TESTS
    // ==========================================

    public function test_permission_service_returns_true_when_user_has_permission(): void
    {
        $user = $this->createUser();
        $permission = Permission::where('name', 'responsability_admin')->first();

        UserPermission::create([
            'user_id' => $user->id,
            'permission_id' => $permission->id,
        ]);

        $service = new PermissionService();
        $hasPermission = $service->hasPermission($user->id, 'responsability_admin');

        $this->assertTrue($hasPermission);
    }

    public function test_permission_service_returns_false_when_user_lacks_permission(): void
    {
        $user = $this->createUser();

        $service = new PermissionService();
        $hasPermission = $service->hasPermission($user->id, 'responsability_admin');

        $this->assertFalse($hasPermission);
    }

    // ==========================================
    // PERMISSION WORKFLOW TESTS
    // ==========================================

    public function test_complete_permission_workflow(): void
    {
        $user = $this->createUser();

        // 1. Start with no permissions
        $response = $this->getJson("/api/user-permission/{$user->id}");
        $this->assertCount(0, $response->json('data'));

        // 2. Add modems permission
        $this->postJson('/api/user-permission', [
            'user_id' => $user->id,
            'permission' => 'modems',
        ]);

        // 3. Verify permission was added
        $response = $this->getJson("/api/user-permission/{$user->id}");
        $this->assertCount(1, $response->json('data'));
        $this->assertEquals('modems', $response->json('data.0.name'));

        // 4. Add another permission
        $this->postJson('/api/user-permission', [
            'user_id' => $user->id,
            'permission' => 'sims',
        ]);

        // 5. Verify both permissions exist
        $response = $this->getJson("/api/user-permission/{$user->id}");
        $this->assertCount(2, $response->json('data'));

        // 6. Remove modems permission (toggle)
        $this->postJson('/api/user-permission', [
            'user_id' => $user->id,
            'permission' => 'modems',
        ]);

        // 7. Verify only sims remains
        $response = $this->getJson("/api/user-permission/{$user->id}");
        $this->assertCount(1, $response->json('data'));
        $this->assertEquals('sims', $response->json('data.0.name'));
    }

    public function test_permissions_are_user_specific(): void
    {
        $user1 = $this->createUser();
        $user2 = User::create([
            'name' => 'Test User 2',
            'email' => 'test2@example.com',
            'password' => bcrypt('password'),
            'privilege' => 1,
            'active' => 1,
        ]);

        // Add permission to user1
        $this->postJson('/api/user-permission', [
            'user_id' => $user1->id,
            'permission' => 'modems',
        ]);

        // User1 should have the permission
        $response = $this->getJson("/api/user-permission/{$user1->id}");
        $this->assertCount(1, $response->json('data'));

        // User2 should NOT have the permission
        $response = $this->getJson("/api/user-permission/{$user2->id}");
        $this->assertCount(0, $response->json('data'));
    }

    // ==========================================
    // ALL AVAILABLE PERMISSIONS TESTS
    // ==========================================

    public function test_all_defined_permissions_can_be_assigned(): void
    {
        $user = $this->createUser();
        $permissions = [
            'platforms', 'users', 'watchs', 'modems',
            'sims', 'cars', 'mark_modems', 'responsability_admin', 'tags'
        ];

        foreach ($permissions as $permName) {
            $response = $this->postJson('/api/user-permission', [
                'user_id' => $user->id,
                'permission' => $permName,
            ]);

            $response->assertStatus(200);
        }

        // Verify all permissions were assigned
        $response = $this->getJson("/api/user-permission/{$user->id}");
        $this->assertCount(count($permissions), $response->json('data'));
    }
}
