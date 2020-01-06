exports.yargs = {
    command: 'webview <url>',
    describe: 'Webview',

    builder: {
        proxyServer: {
            type: 'string',
            description: `Use a specified proxy server, which overrides the system setting.`
        },

        proxyBypassList: {
            type: 'string',
            description: ` bypass the proxy server for the given semi-colon-separated list of hosts`
        },

        noProxyServer: {
            type: 'boolean',
            description: `Don't use a proxy server and always make direct connections.`
        },

        ignoreCertificateErrors: {
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
            args.push('--proxy-server', argv.proxyServer)
        }

        if (argv.proxyBypassList) {
            args.push('--proxy-bypass-list', argv.proxyBypassList)
        }

        if (argv.noProxyServer) {
            args.push('--no-proxy-server')
        }

        if (argv.ignoreCertificateErrors) {
            args.push('--ignore-certificate-errors')
        }

        // TODO: add optional --user-data-dir=$(mktemp -d /tmp/google-chome.XXXXXXX)

        args.push(argv.url)

        await spawnAsync(electron, args, { stdio: 'inherit', shell: true })
    }
}
