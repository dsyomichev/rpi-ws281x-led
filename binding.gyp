{
    'conditions': [
        ['OS=="linux"', {
            'targets': [{
                "target_name": "ws281x_wrapper",
                "cflags!": ["-fno-exceptions"],
                "cflags_cc!": ["-fno-exceptions"],
                'sources': ['./src/core/addon.cc'],
                'dependencies': ['ws281x_lib'],
                'include_dirs': ["<!(node -p \"require('node-addon-api').include_dir\")", "./lib"],
                'defines': ['NAPI_DISABLE_CPP_EXCEPTIONS'],
            }, {
                'target_name': 'ws281x_lib',
                'type': 'static_library',
                'sources': [
                    "./lib/ws281x/ws2811.c",
                    "./lib/ws281x/pwm.c",
                    "./lib/ws281x/dma.c",
                    "./lib/ws281x/mailbox.c",
                    "./lib/ws281x/rpihw.c",
                    "./lib/ws281x//pcm.c"
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
