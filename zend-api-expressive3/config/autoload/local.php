<?php

/**
 * Local configuration.
 *
 * Copy this file to `local.php` and change its settings as required.
 * `local.php` is ignored by git and safe to use for local and sensitive data like usernames and passwords.
 */

return [
    'db' => [
        'driver' => 'Pdo',
        'dsn' => 'mysql:dbname=group_health;host=localhost',
        'driver_options' => [
               PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''
        ],
        'username' => 'root',
        'password' => '',
    ],
];
