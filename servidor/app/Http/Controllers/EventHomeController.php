<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Event;
use Exception;
use Illuminate\Http\Request;

class EventHomeController extends Controller
{
    private function getEventRelations()
    {
        return ['user', 'car', 'modem', 'sim', 'watch', 'platform', 'images', 'comments'];
    }

    public function feed(Request $request)
    {
        try {
            $perPage = 15;
            $page = $request->get('page', 1);

            $events = Event::with($this->getEventRelations())
                ->orderBy('created_at', 'desc')
                ->paginate($perPage, ['*'], 'page', $page);

            return Res::responseSuccess($events);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function feedFromDate(Request $request)
    {
        try {
            $request->validate([
                'date' => 'required|date'
            ]);

            $perPage = 15;
            $page = $request->get('page', 1);
            $date = $request->get('date');

            $events = Event::with($this->getEventRelations())
                ->where('created_at', '>=', $date)
                ->orderBy('created_at', 'desc')
                ->paginate($perPage, ['*'], 'page', $page);

            return Res::responseSuccess($events);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }
}
