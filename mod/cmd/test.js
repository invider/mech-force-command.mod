function test(args, cmd, con) {
    const map = parseInt(args[1])
    if (isNaN(map)) return 'map must be specified'

    con.getMod().lib.control.hide() // hide console
    trap('newGame', {
        map: env.tune.testRange + map,
        fade: {
            fadein:  .5,
            keep:     0,
            fadeout: .5,
        },
    })
}
