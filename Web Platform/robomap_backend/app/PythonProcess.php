<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PythonProcess extends Model
{
    private $command;
    
    public function setCommand($command){
        $this->command = $command;
    }

    public function getCommand(){
        return $this->command;
    }

}
