var express = require('express');
var gcm = require('node-gcm');
var app = express();
var GCM_API_KEY = 'AIzaSyAcKTPBZP3sgohe2VY76eF6r8Ic55tFM_Q'; // server key
//var GCM_API_KEY = 'AIzaSyCvxqkFVHrdkZQHZ2fv-PP_IRwe9-ddgdU'; // android key

var server = app.listen(3000, function () {
    console.log(' - server started up on port 3000');
});

app.get('/', function (req, res) {
    res.send('nothing to see here');
});

app.get('/push', function (req, res) {
    var device_tokens = [];
    
    var retry_times = 4;
    var sender = new gcm.Sender(GCM_API_KEY);
    var message = new gcm.Message({
        collapseKey: 'wtfdiw',
        priority: 'high',
        delayWhileIdle: true,
        timeToLive: 3,
        contentAvailable: true,
        data: {
            title: 'WTFDIW',
            body: 'Should I buy a couch?',
            icon: 'ic_launcher',
            ledColor: [22, 49, 96, 0],
            //vibratePattern: [2000,1000,500,500],
            actions: [{
                icon: 'ic_stat_action_thumb_up',
                title: 'Yes',
                callback: 'foo',
                foreground: false
            }, {
                icon: 'ic_stat_action_thumb_down',
                title: 'No',
                callback: 'foo',
                foreground: false
            }, {
                icon: 'ic_stat_action_schedule',
                title: 'Later',
                callback: 'foo',
                foreground: false
            }],
            wantId: '0'
        }
    });

    device_tokens.push('cXb4d_cLKEI:APA91bG-djo0dXWMZimVFkq0a9UJp4ijQtI1P_-k5xGAxKtWTzXzdwHbfjkbz4UQtN2cO-Zzmw6I9TAfJaZAuve1IWd8a2BcuRKVufVMkkGSe0v7rUuQXbnNDTFhx7ESS62JDuO5aNYs');
    device_tokens.push('dkTV1Zraks8:APA91bHYM5fXxvq6xmMZLeiTNyXS4J9dLH2qwo0GN7Lskj4jzE3twY7D0KYD_JeH6OhvQ_GvQIKklW0qF4GwSyQ62zfV5xkR3O-hdV_E17_lHr5TyG4zo1_Jm4PhzAzkC-GU4NTqqfFK');

    sender.send(message, device_tokens, retry_times, function(result) {
        res.status(200).send('Pushed notification ' + device_tokens);
    }, function(err) {
        res.status(500).send('failed to push notification ');
    });
});
