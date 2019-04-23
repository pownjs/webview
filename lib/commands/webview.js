exports.yargs = {
    command: 'webview <url>',
    describe: 'Webview',

    builder: {
        'interactive': {
            alias: 'i',
            type: 'boolean',
            description: 'Open a REPL to the main process.'
        }
    },

    handler: async(argv) => {
        const util = require('util')
        const electron = require('electron')
        const { spawn } = require('child_process')

        const spawnAsync = util.promisify(spawn)

        const args = []

        if (argv.interactive) {
            args.push('-i')
        }

        args.push(argv.url)

        await spawnAsync(electron, args, { stdio: 'inherit', shell: true })
    }
}
