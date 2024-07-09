namespace effects {
    //% fixedInstance whenUsed block="confetti 2"
    export const confetti2 = new ScreenEffect(10, 40, 4000, function (anchor: particles.ParticleAnchor, particlesPerSecond: number) {
        const factory = new ConfettiFactory(anchor.width ? anchor.width : 16, 16);
        factory.setSpeed(30);
        return new particles.ParticleSource(anchor, particlesPerSecond, factory);
    });


    export class ConfettiFactory extends particles.ShapeFactory {
        constructor(xRange: number, yRange: number) {
            const confetti = [
                img`
                    F
                `,
                img`
                    F
                    F
                `,
                img`
                    F F
                `,
                img`
                    F F
                    F .
                `,
                img`
                    F F
                    . F
            `];
            super(xRange, yRange, confetti[0]);
            for (let i = 1; i < confetti.length; i++) {
                this.addShape(confetti[i]);
            }

            this.minLifespan = 1000;
            this.maxLifespan = 4500;
        }

        createParticle(anchor: particles.ParticleAnchor) {
            const p = super.createParticle(anchor);
            p.color = 4;
            return p;
        }
    }
}