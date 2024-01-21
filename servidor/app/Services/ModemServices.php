<?php

namespace App\Services;

use App\Http\Services\ResponsabilityServices;
use App\Models\Modem;
use App\Models\Responsability;
use App\Models\ResponsabilityHistory;
use App\Services\ResponsabilityServices as ServicesResponsabilityServices;

class ModemServices
{
    public function _searchByImei($imei)
    {
        $modem = Modem::where("imei", $imei)->first();
        return $modem;
    }
    
    public function updateForTransforRequest(Modem $modem, $user_responsability_id, $user_successor_id, $observation)
    {
        $responsabilityServices = new ServicesResponsabilityServices();
        $responsability = $responsabilityServices->storePending("modem", $modem->id, $observation, $user_responsability_id, $user_successor_id);

        $modem[Modem::COL_USER_SUCCESSOR_ID] = $user_successor_id;
        $modem[Modem::COL_USER_RESPONSABILITY_ID] = $user_responsability_id;
        $modem[Modem::COL_RESPONSABILITY_ID] = $responsability->id;
        $modem[Modem::COL_IS_PENDING] = true;
        $modem->save();

        return $modem;
        
    }

    public function updateForTransfer(Modem $modem, $user_new_responsability_id, $status)
    {
        $responsabilityServices = new ServicesResponsabilityServices();
        $responsabilityServices->updateForRequest($modem[Modem::COL_RESPONSABILITY_ID], $status);

        $modem[Modem::COL_USER_SUCCESSOR_ID] = null;
        $modem[Modem::COL_USER_RESPONSABILITY_ID] = $user_new_responsability_id;
        $modem[Modem::COL_RESPONSABILITY_ID] = null;
        $modem[Modem::COL_IS_PENDING] = false;
        $modem->save();
        
        return $modem;
    }
}