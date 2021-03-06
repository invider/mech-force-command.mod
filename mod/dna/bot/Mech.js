// @depends(dna/bot/Platform)

const df = {
    symbol: 'A',
    kind: 'mech',
    health: 100,
    level: 1,
}

class Mech extends dna.bot.Platform {

    constructor(st) {
        super( augment({}, df, st) )
        this.origSymbol = this.symbol
        this.pickName(false)

        this.attach(dna.pod.brain)
        this.attach(dna.pod.cache)
        this.attach(dna.pod.marker)
        this.attach(dna.pod.pathFinder)
        this.attach(dna.pod.lfx)
        this.attach(dna.pod.gun)
        this.attach(dna.pod.scanner)
        this.attach(dna.pod.move)
        this.attach(dna.pod.control)
        this.attach(dna.pod.totalControl)
        this.attach(dna.behavior.Fighter)
    }

    pickName(rename) {
        const team = env.team.get(this.team)
        const serialId = team.nextSerial()
        if (rename || !this.name) {
            this.name = env.team.getName(this.team)
                + '-mech-' + serialId
        }
        if (rename || !this.title) {
            this.title = env.team.getName(this.team)
                + ' mech ' + serialId
        }
    }

    /*
    takeControl() {
        this.symbol = '@'
        this.detach(this.behavior) // disable AI
        this.attach(dna.pod.control)
        this.attach(dna.pod.totalControl)
        lab.control.player.bind(this, this.id)
    }

    releaseControl() {
        this.attach(dna.behavior.RandomWalker)
        this.detach(this.totalControl)
    }
    */

    fsfx(name, vol) {
        if (lab.mode.port1.inFocus(this)) {
            lib.sfx(name, vol)
        }
    }

    lsfx(name) {
        lib.sfx.at(name, this.x, this.y)
    }

    drop() {
        const n = RND(3, 9)
        for (let i = 0; i < n; i++) {
            let s = 'o'
            if (rnd() > .4) s = '*'
            lab.world.spawn( dna.prop.Drop, {
                team: this.team,
                symbol: s,
                spread: RND(1, 5),
                x: this.x,
                y: this.y,
            })
        }
    }

    hit(source, force, type) {
        this.lfx.light(.8, .01, .6)
        if (this.god) return

        this.health -= force
        if (this.health <= 0) {
            this.dead = true
            this.health = 0
            this.drop()
            kill(this)
            job.mission.on('kill', this, {
                source,
            })
            lib.sfx.at('kill', this.x, this.y)
        }
    }

    push(target) {
        if (this.team === 0) return
        if (!target || target.kind !== 'mech') return

        if (target.team === 0) {
            // interface and capture the mech!
            log(`${target.title} is captured by ${this.name}`)
            target.team = this.team
            target.pickName(true)
            job.mission.on('capture', target, {
                team: this.team,
                source: this,
            })
            switch(this.team) {
                case 1: lib.sfx.at('capture1', this.__.x, this.__.y); break;
                case 2: lib.sfx.at('capture2', this.__.x, this.__.y); break;
                case 3: lib.sfx.at('capture3', this.__.x, this.__.y); break;
                case 4: lib.sfx.at('capture4', this.__.x, this.__.y); break;
                default: case 1: lib.sfx.at('capture1', this.__.x, this.__.y);
            }

        } else if (target.team === this.__.team) {
            // TODO only if this mech is taken...
            // TODO mark the mech for interfacing
            // TODO interfacing sfx
        }
    }

    levelUp() {
        if (this.level >= 26) return
        this.level ++
        this.origSymbol = String.fromCharCode('A'.charCodeAt(0) + this.level)
        if (!this.taken) this.symbol = this.origSymbol
    }

    energyUp() {
        const max = 80 + this.level * 20
        this.health = min(this.health + 50, max)
    }

    pickup(drop) {
        switch(drop.symbol) {
            case '*':
                this.energyUp()
                break
            case 'o':
                this.levelUp()
                break
        }
        this.fsfx('pickup')
    }
}
