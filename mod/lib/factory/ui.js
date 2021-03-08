function ui() {
    const tx = lab.textMode

    const titleBar = tx.spawn(dna.hud.TitleBar, { hidden: true })
    const statusBar = tx.spawn(dna.hud.StatusBar, { hidden: true })
    //tx.spawn(dna.hud.SidePanel, { hidden: true })

    const port1 = tx.spawn('hud/ViewPort', {
        name: 'port1',
        hidden: true,
        stick: 'top-left',
    })
    const port2 = tx.spawn('hud/ViewPort', {
        name: 'port2',
        hidden: true,
        stick: 'top-right',
    })
    const port3 = tx.spawn('hud/ViewPort', {
        name: 'port3',
        hidden: true,
        stick: 'bottom-left',
    })
    const port4 = tx.spawn('hud/ViewPort', {
        name: 'port4',
        hidden: true,
        stick: 'bottom-right',
    })

    const vs1 = tx.spawn('hud/VerticalSeparator', {
        name: 'vs1',
        target: port2,
    })
    const vs2 = tx.spawn('hud/VerticalSeparator', {
        name: 'vs2',
        target: port4,
    })
    const hs1 = tx.spawn('hud/HorizontalSeparator', {
        name: 'hs1',
        target: port3,
    })
    const hs2 = tx.spawn('hud/HorizontalSeparator', {
        name: 'hs2',
        target: port4,
    })

    lab.screenKeeper.define('game', [
        titleBar, statusBar,
        port1, port2, port3, port4,
        vs1, vs2, hs1, hs2,
    ])
    //tx.spawn(dna.hud.DebugPanel)

    return this
}
