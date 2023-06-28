<?php

namespace App\Http\Controllers\Neuraflow;

use App\HistoricalAlarmActive;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

class HistoricalAlarmActiveController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $historical = HistoricalAlarmActive::all();

        if(!$historical){
            return null;
        }

        return $historical;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\HistoricalAlarmActive  $historicalAlarmActive
     * @return \Illuminate\Http\Response
     */
    public function show(HistoricalAlarmActive $historicalAlarmActive)
    {
        //
    }

     /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showByAlarmId($id)
    {
        $historical = HistoricalAlarmActive::orderBy('created_at','DESC')->where('id_alarm', $id)->get();

        if(!$historical){
            return null;
        }

        return $historical;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\HistoricalAlarmActive  $historicalAlarmActive
     * @return \Illuminate\Http\Response
     */
    public function edit(HistoricalAlarmActive $historicalAlarmActive)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\HistoricalAlarmActive  $historicalAlarmActive
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, HistoricalAlarmActive $historicalAlarmActive)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\HistoricalAlarmActive  $historicalAlarmActive
     * @return \Illuminate\Http\Response
     */
    public function destroy(HistoricalAlarmActive $historicalAlarmActive)
    {
        //
    }
}
