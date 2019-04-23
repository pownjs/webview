exports.yargs = {
    command: 'webview <url>',
    describe: 'Webview',

    builder: {
        proxyServer: {
            alias: 'p',
            type: 'string',
            description: `Use a specified proxy server, which overrides the system setting.`
        },

        noProxyServer: {
            alias: 'n',
            type: 'boolean',
            description: `Don't use a proxy server and always make direct connections.`
        },

        ignoreCertificateErrors: {
            alias: 'e',
            type: 'boolean',
            description: `Ignore certificate errors.`
        }
    },

    handler: async(argv) => {
        const util = require('util')
        const electron = require('electron')
        const { spawn } = require('child_process')

        const spawnAsync = util.promisify(spawn)

        const args = []

        if (argv.proxyServer) {
            args.push('--proxy-server')
        }

        if (argv.noProxyServer) {
            args.push('--no-proxy-server')
        }

        if (argv.ignoreCertificateErrors) {
            args.push('--ignore-certificate-errors')
        }

        args.push(argv.url)

        await spawnAsync(electron, args, { stdio: 'inherit', shell: true })
    }
}
