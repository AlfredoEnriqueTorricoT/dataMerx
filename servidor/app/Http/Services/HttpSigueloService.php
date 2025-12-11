<?php


namespace App\Http\Services;

use Exception;
use Illuminate\Support\Facades\Http;

class HttpSigueloService
{
    
    public function sendPeticion($platform, $slug, $data)
    {
        $response = $this->realizarSolicitudHttp($platform->url, $slug, $platform->email, $platform->password, $data);

        // Validar la respuesta y obtener información sobre el estado
        $statusInfo = $this->validarRespuesta($response);
        
        return [
            'status' => $statusInfo['status'],
            'message' => $statusInfo['message'],
            'response' => $statusInfo['response'],
        ];
    }

    public function validarRespuesta($response)
    {
        if ($response instanceof Exception) {
            return [
                'status' => 'error',
                'message' => $response->getMessage(),
                'response' =>  $response->getMessage()
            ];
        } elseif ($response->successful()) {
            return [
                'status' => 'success',
                'message' => 'La solicitud fue exitosa.',
                'response' => $response->json(),
            ];
        } else {
            return [
                'status' => 'error',
                'message' => 'Error en la solicitud. Código: ' . $response->status() . ' ',
                'response' =>  $response->status()
            ];
        }
    }


    
    public function realizarSolicitudHttp($url, $slug, $username, $password, $jsonData = null)
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Basic ' . base64_encode($username . ':' . $password),
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ]);

            if ($jsonData == null) {
                return $response->get($url . $slug);
            } else {
                return $response->post($url . $slug, $jsonData);
            }
        } catch (Exception $ex) {
            return $ex;
        }
    }
    
}