<?php

namespace App\Services;

use App\Models\ResponsabilityHistory;

class ResponsabilityServices
{

    public function storePending($table, $table_id, $observation, $user_responsability_id, $user_successor_id)
    {
        $responsability = ResponsabilityHistory::create([
            ResponsabilityHistory::COL_TABLE => $table,
            ResponsabilityHistory::COL_TABLE_ID => $table_id,
            ResponsabilityHistory::COL_STATUS => ResponsabilityHistory::STATUS_PENDIENTE,
            ResponsabilityHistory::COL_OBSERVATION => $observation,
            ResponsabilityHistory::COL_USER_RESPONSABILITY_ID => $user_responsability_id,
            ResponsabilityHistory::COL_USER_SUCCESSOR_ID => $user_successor_id
        ]);
        return $responsability;
    }

    public function updateForRequest($responsability_id, $status)
    {
        return ResponsabilityHistory::where("id", $responsability_id)
            ->update([
                ResponsabilityHistory::COL_STATUS => $status
            ]);
    }

    

    
}