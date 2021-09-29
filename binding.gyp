{
    "targets": [
        {
            "target_name": "driver",
            "cflags!": ["-fno-exceptions"],
            "cflags_cc!": ["-fno-exceptions"],
            "sources": ["src/addon.cc", "src/ws_driver.cc"],
            'include_dirs': ["<!(node -p \"require('node-addon-api').include_dir\")"],
            'defines': ['NAPI_DISABLE_CPP_EXCEPTIONS'],
        }
    ],
    'conditions': [
        ['OS=="mac"', {
            'cflags+': ['-fvisibility=hidden'],
            'xcode_settings': {
                'GCC_SYMBOLS_PRIVATE_EXTERN': 'YES',  # -fvisibility=hidden
            }
        }]
    ]
}
