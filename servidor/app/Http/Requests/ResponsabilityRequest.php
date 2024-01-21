<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResponsabilityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'table' => ['required', 'string', 'in:modem,sim,watch'],
            'table_id' => ['required', 'integer'],
            'status' => ['required', 'string', 'in:Confirmado,Pendiente,Anulado'],
            'message_to' => ['required', 'string', 'in:none,received,delivered'],
            'user_delivered' => ['required', 'integer'],
            'user_recieved' => ['required', 'integer']
        ];
    }
}
