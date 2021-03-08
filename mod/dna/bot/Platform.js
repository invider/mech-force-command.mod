const dt = {
    symbol: 'P',
    status: '',
    solid: true,
    transparent: false,
    x: 0,
    y: 0,
}

class Platform {

    constructor(st) {
        this.pod = []
        augment(this, dt)
        augment(this, st)

        if (this.install) {
            for (let pod of this.install) {
                this.attach(pod)
            }
        }
    }

    init() {}

    attach(src, st) {
        if (!src) throw 'no source object to attach!'

        let pod

        if (isFun(src)) {
            if (/[A-Z]/.test(src.name[0])) {
                // upper-case means constructor
                pod = new src(st)
                if (!pod.name) {
                    pod.name = src.name[0].toLowerCase()
                        + src.name.substring(1)
                }
            } else {
                // just a function pod - attach as is
                pod = src
            }
        } else {
            pod = {}
            augment(pod, src) 
            augment(pod, st)
        }

        this.pod.push(pod)
        if (pod.alias) this[pod.alias] = pod
        else if (pod.name) this[pod.name] = pod
        pod.__ = this

        if (pod.onInstall) pod.onInstall()
    }

    detach(pod) {
        if (!pod) return
        const i = this.pod.indexOf(pod)

        if (i >= 0) {
            if (pod.onDeinstall) pod.onDeinstall()
            if (pod.alias) delete this[pod.alias]
            else if (pod.name) delete this[pod.name]
            this.pod.splice(i, 1)
        }
    }

    next() {
        if (this.behave) this.behave()
        /*
        const dir = RND(3)
        this.move.dir(dir)
        */
    }

    color() {
        const team = this.team || 0
        return pal.team[team].color
    }

    getStatus() {
        if (this.status) return this.name + ' - ' + this.status
        else return this.name
    }

    kill() {
        const platform = this

        defer(() => {
            platform.dead = true
            log(`${platform.name} has died!`)
            platform.__.detach(platform)
        })
    }
}
