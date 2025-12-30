<?php

namespace App\Http\Controllers;

use App\Http\Res;
use App\Models\Comment;
use Exception;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function getByEvent($eventId)
    {
        try {
            $comments = Comment::where(Comment::COL_EVENT_ID, $eventId)
                ->whereNull(Comment::COL_PARENT_ID)
                ->with(['user', 'replies'])
                ->orderBy('created_at', 'desc')
                ->get();

            return Res::responseSuccess($comments);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                Comment::COL_COMMENT => 'required',
                Comment::COL_EVENT_ID => 'required|exists:events,id',
                Comment::COL_PARENT_ID => 'nullable|exists:comments,id',
            ]);

            $request->merge([
                Comment::COL_USER_ID => $request->user()->id
            ]);

            $comment = Comment::create($request->all());
            $comment->load('user');

            return Res::responseSuccess($comment);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }

    public function destroy(Request $request, $id)
    {
        try {
            if ($request->user()->privilege != 0) {
                return Res::responseError('No tienes permisos para eliminar comentarios');
            }

            $comment = Comment::find($id);

            if ($comment == null) {
                return Res::responseErrorNoData();
            }

            $comment->delete();

            return Res::responseSuccess(['deleted' => true]);
        } catch (Exception $ex) {
            return Res::responseError($ex->getMessage());
        }
    }
}
