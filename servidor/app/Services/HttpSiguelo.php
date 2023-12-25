<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;

class HttpSiguelo
{

    public function getDataOfPlatform($listPlatform, $slug, $data)
    {
        $list = array();
        $error = array();

        foreach ($listPlatform as $platform) {

            $peticion = $this->realizarSolicitudHttp($platform->url, $slug, $platform->email, $platform->password, $data);
            if ($peticion instanceof Exception) {
                // Manejo del error

                $obj_response = [
                    "platform_id" => $platform->id,
                    "status" => 0,
                    "response" => [
                        "message" => $peticion->getMessage(),
                        "statusServer" => 404,
                    ]
                ];

                array_push($error, $obj_response);
            } else   if ($peticion->successful()) {
                $key = $platform->id;
                $obj_response = [
                    "platform_id" => $platform->id,
                    "status" => 1,
                    "response" => json_decode($peticion->body(), JSON_UNESCAPED_SLASHES)
                ];

                array_push($list, $obj_response);
            } else {
                $errorCode = $peticion->status();

                $obj_response =  [
                    "status" => 0,
                    "response" => [
                        "message" => "Las credenciales son incorrectas",
                        "statusServer" => $errorCode,
                        "username" => $platform->email
                    ]
                ];
                array_push($error, $obj_response);
            }
        }

        return [
            "list" => $list,
            "errors" => $error
        ];
    }

    public function testPlatformConnect($url, $email, $password)
    {
        $slug = "/api/maintenance";
        $response = $this->realizarSolicitudHttp($url, $slug, $email, $password);

        if ($response instanceof Exception) {
            // Manejo del error

            return [
                "status" => 0,
                "data" => [
                    "message" => $response->getMessage(),
                    "statusServer" => 404,
                ]
            ];
        } else   if ($response->successful()) {
            return [
                "status" => 1
            ];
        } else {
            $errorCode = $response->status();

            return [
                "status" => 0,
                "data" => [
                    "message" => "Las credenciales son incorrectas",
                    "statusServer" => $errorCode,
                    "username" => $email
                ]
            ];
        }
    }

    public function sendPeticion($platform, $slug, $data)
    {
        $response = $this->realizarSolicitudHttp($platform->url, $slug, $platform->email, $platform->password, $data);

        // Validar la respuesta y obtener información sobre el estado
        $statusInfo = $this->validarRespuesta($response);

        return [
            'status' => $statusInfo['status'],
            'message' => $statusInfo['message'],
            'response' => $response->json(),
        ];
    }

    public function validarRespuesta($response)
    {
        if ($response instanceof Exception) {
            return [
                'status' => 'error',
                'message' => $response->getMessage(),
            ];
        } elseif ($response->successful()) {
            return [
                'status' => 'success',
                'message' => 'La solicitud fue exitosa.',
            ];
        } else {
            return [
                'status' => 'error',
                'message' => 'Error en la solicitud. Código: ' . $response->status(),
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
                //echo $url . $slug;
                return $response->post($url . $slug, $jsonData);
            }
        } catch (Exception $ex) {
            return $ex;
        }
    }

    // Puedes añadir más métodos y lógica a tu clase si es necesario
}
