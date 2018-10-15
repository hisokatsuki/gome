// ({
//     paths: {
//         index: './src/script/js/index',
//         jquery: './src/script/thirdplugins/jquery',
//         tools: './src/script/js/tools',
//         header: './src/script/js/header',
//         index_data: './src/script/js/index_data',
//         index_effect: './src/script/js/index_effect'
//     },
//     name: 'index', // 模块入口
//     out: "dist/index-main.js", // 输出压缩后的文件位置
// })

// ({
//     paths: {
//         config: './src/script/js/config',
//         register: './src/script/js/register',
//         register_jq:'./src/script/js/register_jq',
//     },
//     name: 'register', // 模块入口
//     out: "dist/register-main.js", // 输出压缩后的文件位置
// })

// ({
//         paths: {
//             config: './src/script/js/config',
//             login: './src/script/js/login',
//             login_jq:'./src/script/js/login_jq',
//         },
//         name: 'login', // 模块入口
//         out: "dist/login-main.js", // 输出压缩后的文件位置
//     })
({
    paths: {
        config: './src/script/js/config',
        register: './src/script/js/register',
        register_jq:'./src/script/js/register_jq',
    },
    name: 'register', // 模块入口
    out: "dist/register-main.js", // 输出压缩后的文件位置
})