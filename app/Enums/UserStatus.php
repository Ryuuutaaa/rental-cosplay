<?php

namespace App\Enums;

enum UserStatus: string
{
    case Active = 'active';
    case Banned = 'banned';
}
