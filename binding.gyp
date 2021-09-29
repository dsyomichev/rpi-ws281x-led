{
    'conditions': [
        ['OS=="linux"', {
            'targets': [{
                "target_name": "wrapper",
                "cflags!": ["-fno-exceptions"],
                "cflags_cc!": ["-fno-exceptions"],
                'dependencies': ['ws281x'],
                'include_dirs': ["<!(node -p \"require('node-addon-api').include_dir\")"],
                'defines': ['NAPI_DISABLE_CPP_EXCEPTIONS'],
            }, {
                'target_name': 'ws281x',
                'type': 'static_library',
                'sources': [
                    # https://github.com/beyondscreen/node-rpi-ws281x-native/blob/master/binding.gyp
                    "<!@(node -p \"require('fs').readdirSync('./src/rpi_ws281x').filter(f => (f.match(/\.c$/) && !f.match('main.c'))).map(f => 'src/rpi_ws281x/' + f).join(' ')\")"
                ],
            }]
        },
            {
            'targets': [{
                'target_name': 'wrapper',
                'type': 'none',
                'actions': [{
                        'action_name': 'unsupported_os',
                        'inputs': [],
                        'outputs': ['no-build'],
                        'action': ['true'],
                        'message': 'Package is being installed on an unsupported OS. A non-functional interface will be provided.'
                }]
            }]
        }]
    ],
}
