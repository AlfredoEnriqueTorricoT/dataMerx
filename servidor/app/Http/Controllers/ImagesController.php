<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Images;
use Faker\Provider\Image;
use Illuminate\Http\Request;

class ImagesController extends Controller
{
    //


    static public function upload(Request $request, $table, $table_id)
    {

        //$user = auth()->user();

        $ruta = "images/".$table;
        $nameImage = "";

            foreach ($request->file('images') as $imagefile) {
                $nameImage = time() . "___" . $imagefile->getClientOriginalName();
                $imagefile->storeAs("public/" . $ruta."/", $nameImage);
                $image = new Images();
                //$path = $imagefile->store($ruta, ['disk' =>   'my_files']);
                $image->url = $ruta."/".$nameImage;
                $image->table = $table;
                $image->table_id = $table_id;
                $image->save();

            }
            /*$request->file('images')
                ->storeAs("public/" . $ruta, $nameImage);*/

            /*$obj = User::find($user->id);

            $obj->logo = "storage/" . $ruta . $nameImage;
            $obj->save();

            if ($obj == null) {
                return Res::responseErrorNoData();
            }*/


        //return Res::responseSuccess("storage/" . $ruta . $nameImage);
    }
}
