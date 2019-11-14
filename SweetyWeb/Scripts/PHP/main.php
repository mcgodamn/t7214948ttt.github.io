<?php
    function _post($str){

        $val = !empty($_POST[$str]) ? $_POST[$str] : "";

        return $val;

    }

    // $url = 'http://192.168.10.9:8092/PlayerQuery?';
    $url = "http://47.75.81.201/test/PlayerQuery?";
    $game_key = 'sweetyprince2';

    date_default_timezone_set("Asia/Taipei");
    $time = date_format(date_create(),"YmdHi");

    $uid = _post('uid');
    $email = _post('email');
    $country = _post('country');
    $mobile = _post('mobile');

    $sign = strtoupper(
        MD5($game_key . $time . $uid . $email . $country . $mobile .  _post('password') . 'enjoyplay')
    );

    $url = $url . 'game_key=' . $game_key . '&time=' . $time . '&uid=' . $uid . '&email='. $email. '&country=' . $country  . '&mobile='. $mobile . '&sign=' . $sign;

    $ch = curl_init();
    
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $output = curl_exec($ch);
    
    curl_close($ch);
    
    echo $output;
?>