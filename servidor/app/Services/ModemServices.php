<?php

namespace App\Services;

use App\Models\Modem;

class ModemServices
{
    public function _searchByImei($imei)
    {
        $modem = Modem::where("imei", $imei)->first();
        return $modem;
    }    
}