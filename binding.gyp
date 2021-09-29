{
    'conditions': [
        ['OS=="linux"', {
            'targets': [{
                "target_name": "rpi_ws281x_node",
                "cflags!": ["-fno-exceptions"],
                "cflags_cc!": ["-fno-exceptions"],
                'sources': ['./src/addon/ws281x.cc'],
                'dependencies': ['rpi_ws281x'],
                'include_dirs': ["<!(node -p \"require('node-addon-api').include_dir\")", "./lib"],
                'defines': ['NAPI_DISABLE_CPP_EXCEPTIONS'],
            }, {
                'target_name': 'rpi_ws281x',
                'type': 'static_library',
                'sources': [
                    "./lib/rpi_ws281x/ws2811.c",
                    "./lib/rpi_ws281x/pwm.c",
                    "./lib/rpi_ws281x/dma.c",
                    "./lib/rpi_ws281x/mailbox.c",
                    "./lib/rpi_ws281x/rpihw.c",
                    "./lib/rpi_ws281x/pcm.c"
                ],
            }]
        },
            {
            'targets': [{
                'target_name': 'rpi_ws281x_node',
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
