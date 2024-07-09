namespace SpriteKind {
    export const Crowd = SpriteKind.create()
}
controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    cycleLimb(Horatios_limb_positions, 0)
})
controller.player3.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    cycleLimb(Esmereldas_Limb_Positions, 0)
})
function renderGuy (x: number, y: number, body: Image, arms: Image[], legs: Image[], limbPositions: any[], screen2: Image) {
    spriteutils.drawTransparentImage(body, screen2, x, y)
    spriteutils.drawTransparentImage(arms[parseFloat("" + limbPositions[0])], screen2, x - 12, y - 2)
    spriteutils.drawTransparentImage(legs[parseFloat("" + limbPositions[1])], screen2, x - 14, y + 14)
    drawFlipped(x + 9, y - 2, arms[parseFloat("" + limbPositions[2])], screen2)
    drawFlipped(x + 7, y + 14, legs[parseFloat("" + limbPositions[3])], screen2)
}
function makeCrowdParticipant (x: number) {
    tempSprite = sprites.create(img`
        . . 7 7 . . 
        . 7 7 7 7 . 
        . 7 7 7 7 . 
        . 7 7 7 7 . 
        . . . . . . 
        . 7 7 7 7 . 
        7 7 7 7 7 7 
        7 7 7 7 7 7 
        7 7 7 7 7 7 
        7 7 7 7 7 7 
        `, SpriteKind.Crowd)
    if (Math.percentChance(50)) {
        tempSprite.setImage(img`
            . . . . . . 
            . . . . . . 
            . . . . . . 
            . . . 7 . . 
            . . 7 7 7 . 
            . . 7 7 7 . 
            . . . . . . 
            . . 7 7 7 . 
            . 7 7 7 7 7 
            . 7 7 7 7 7 
            `)
    }
    if (x < 40) {
        tempSprite.image.replace(7, [10]._pickRandom())
    } else if (x < 80) {
        tempSprite.image.replace(7, [6]._pickRandom())
    } else if (x < 120) {
        tempSprite.image.replace(7, [2]._pickRandom())
    } else {
        tempSprite.image.replace(7, [7]._pickRandom())
    }
    return tempSprite
}
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    cycleLimb(Horatios_limb_positions, 3)
})
function spawnWall () {
    if (currentWallSprite) {
        currentWallSprite.destroy()
    }
    currentWallSprite = sprites.create(makeWallImage(), SpriteKind.Player)
    currentWallSprite.bottom = 0
    animation.runMovementAnimation(
    currentWallSprite,
    "v 50",
    200,
    false
    )
    timer.after(200, function () {
        scene.cameraShake(2, 200)
        music.smallCrash.play()
    })
    timer.after(1000, function () {
        currentWallSprite.setVelocity(0, 7 + Math.max(Math.max(info.player1.score(), info.player2.score()), Math.max(info.player3.score(), info.player4.score())) * 3)
    })
}
controller.player4.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    cycleLimb(Raphaels_Limb_Positions, 0)
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    cycleLimb(Horatios_limb_positions, 2)
})
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    cycleLimb(Geraldos_limb_positions, 0)
})
controller.player1.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    cycleLimb(Geraldos_limb_positions, 1)
})
controller.player4.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    cycleLimb(Raphaels_Limb_Positions, 1)
})
function makeWallImage () {
    wallImage = image.create(160, 40)
    wallImage.fill(15)
    tempLimbPositions = [
    randint(0, 2),
    randint(0, 2),
    randint(0, 2),
    randint(0, 2)
    ]
    renderGuy(15, 13, Geraldos_Body, Geraldos_Arms, Geraldos_Legs, tempLimbPositions, wallImage)
    renderGuy(55, 13, Horatios_Body, Horatios_Arms, Horatios_Leg, tempLimbPositions, wallImage)
    renderGuy(95, 13, Esmereldas_Body, Esmereldas_Arms, Esmereldas_Legs, tempLimbPositions, wallImage)
    renderGuy(135, 13, Raphaels_Body, Raphaels_Arms, Raphaels_Legs, tempLimbPositions, wallImage)
    for (let index = 0; index <= 13; index++) {
        wallImage.replace(index + 1, 0)
    }
    wallImage.replace(15, 4)
    return wallImage
}
controller.player3.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    cycleLimb(Esmereldas_Limb_Positions, 2)
})
controller.player1.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    cycleLimb(Geraldos_limb_positions, 3)
})
function drawFlipped (x: number, y: number, image2: Image, screen2: Image) {
    tempImage = image2.clone()
    tempImage.flipX()
    spriteutils.drawTransparentImage(tempImage, screen2, x, y)
}
function cycleLimb (limbPositions: number[], index: number) {
    limbPositions[index] = (limbPositions[index] + 1) % 3
    if (limbPositions == Geraldos_limb_positions) {
        music.playSoundEffect(music.createSoundEffect(
        WaveShape.Triangle,
        randint(400, 500),
        400,
        100,
        0,
        100,
        SoundExpressionEffect.None,
        InterpolationCurve.Linear
        ), SoundExpressionPlayMode.UntilDone)
    }
    if (limbPositions == Horatios_limb_positions) {
        tempFreq = randint(300, 400)
        music.playSoundEffect(music.createSoundEffect(
        WaveShape.Square,
        tempFreq,
        tempFreq,
        100,
        0,
        100,
        SoundExpressionEffect.None,
        InterpolationCurve.Linear
        ), SoundExpressionPlayMode.InBackground)
    }
    if (limbPositions == Esmereldas_Limb_Positions) {
        tempFreq = randint(600, 800)
        music.playSoundEffect(music.createSoundEffect(
        WaveShape.Sawtooth,
        tempFreq,
        tempFreq,
        50,
        0,
        200,
        SoundExpressionEffect.Vibrato,
        InterpolationCurve.Linear
        ), SoundExpressionPlayMode.InBackground)
    }
    if (limbPositions == Raphaels_Limb_Positions) {
        music.playSoundEffect(music.createSoundEffect(
        WaveShape.Sine,
        randint(500, 600),
        0,
        100,
        0,
        100,
        SoundExpressionEffect.None,
        InterpolationCurve.Linear
        ), SoundExpressionPlayMode.InBackground)
    }
}
controller.player3.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    cycleLimb(Esmereldas_Limb_Positions, 3)
})
controller.player3.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    cycleLimb(Esmereldas_Limb_Positions, 1)
})
controller.player4.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    cycleLimb(Raphaels_Limb_Positions, 2)
})
function arraysAreEqual (a: any[], b: any[]) {
    for (let index = 0; index <= 3; index++) {
        if (a[index] != b[index]) {
            return false
        }
    }
    return true
}
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    cycleLimb(Horatios_limb_positions, 1)
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    cycleLimb(Geraldos_limb_positions, 2)
})
spriteutils.createRenderable(5, function (screen2) {
    renderGuy(15, 80, Geraldos_Body, Geraldos_Arms, Geraldos_Legs, Geraldos_limb_positions, screen2)
    renderGuy(55, 80, Horatios_Body, Horatios_Arms, Horatios_Leg, Horatios_limb_positions, screen2)
    renderGuy(95, 80, Esmereldas_Body, Esmereldas_Arms, Esmereldas_Legs, Esmereldas_Limb_Positions, screen2)
    renderGuy(135, 80, Raphaels_Body, Raphaels_Arms, Raphaels_Legs, Raphaels_Limb_Positions, screen2)
})
controller.player4.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    cycleLimb(Raphaels_Limb_Positions, 3)
})
function makeTitleCard () {
    gameStarted = false
    titleCard = sprites.create(img`
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        `, SpriteKind.Player)
    titleCard.z = 998
    mySprite3 = sprites.create(img`
        ........bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb...........
        ........bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb...........
        ........333333333.............333333333.............333333333.............333333333.............333333333.............333333333.............333333333...........
        ........331333133.............331333133.............331333133.............331333133.............331333133.............331333133.............331333133...........
        ........333333333.............333333333.............333333333.............333333333.............333333333.............333333333.............333333333...........
        .....aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa........
        .....aaaaaaababbaaaa.......aaaaaaababbaaaa.......aaaaaaababbaaaa.......aaaaaaababbaaaa.......aaaaaaababbaaaa.......aaaaaaababbaaaa.......aaaaaaababbaaaa........
        .....aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
        .....aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
        .....aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
        .....aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
        .....aa.eeee4eeee.aa.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa........
        .....aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa........
        .....aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa........
        .....33...cc.cc...33.......33...cc.cc...33.......33...cc.cc...33.......33...cc.cc...33.......33...cc.cc...33.......33...cc.cc...33.......33...cc.cc...33........
        .....3....cc.cc....3.......3....cc.cc....3.......3....cc.cc....3.......3....cc.cc....3.......3....cc.cc....3.......3....cc.cc....3.......3....cc.cc....3........
        ..........cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
        ..........cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
        ..........cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
        ..........cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
        ..........cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
        ..........cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
        ..........cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
        ..........22.22.................22.22.................22.22.................22.22.................22.22.................22.22.................22.22.............
        ..........e2.2e.................e2.2e.................e2.2e.................e2.2e.................e2.2e.................e2.2e.................e2.2e.............
        ........2222.2222.............2222.2222.............2222.2222.............2222.2222.............2222.2222.............2222.2222.............2222.2222...........
        ........2222.2222.............2222.2222.............2222.2222.............2222.2222.............2222.2222.............2222.2222.............2222.2222...........
        ........ee.e.e.ee.............ee.e.e.ee.............ee.e.e.ee.............ee.e.e.ee.............ee.e.e.ee.............ee.e.e.ee.............ee.e.e.ee...........
        `, SpriteKind.Player)
    mySprite3.z = 999
    mySprite3.top = 15
    timer.background(function () {
        wallImage = image.create(160, 40)
        wallImage.fill(4)
        currentWallSprite = sprites.create(wallImage, SpriteKind.Player)
        currentWallSprite.bottom = 0
        currentWallSprite.z = 998.5
        pause(1000)
        animation.runImageAnimation(
        mySprite3,
        [img`
            ...bbbbbbbbb..................bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb...........
            ...bbbbbbbbb..................bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb...........
            ...333333333caaaaaaaa.........333333333.............333333333.............333333333.............333333333.............333333333.............333333333...........
            ...331333133caaaaaaaa.........331333133.............331333133.............331333133.............331333133.............331333133.............331333133...........
            ...333333333.......aa.........333333333.............333333333.............333333333.............333333333.............333333333.............333333333...........
            ...aaaabaaaaaaa....aa......aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa........
            ...aaaababbaaaa....aa......aaaaaaababbaaaa.......aaaaaaababbaaaa.......aaaaaaababbaaaa.......aaaaaaababbaaaa.......aaaaaaababbaaaa.......aaaaaaababbaaaa........
            ...aaaabaaaa.aa....aa......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...aaaabaaaa.aa....33......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...aaaabaaaa.aa.....3......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...aaaabaaaa.aaaaaa33......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...eeee4eeee.aaaaaa3.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa........
            ...ccccccccc...............aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa........
            ...ccccccccc...............aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa........
            .....cc.cc.................33...cc.cc...33.......33...cc.cc...33.......33...cc.cc...33.......33...cc.cc...33.......33...cc.cc...33.......33...cc.cc...33........
            .....cc.cc.................3....cc.cc....3.......3....cc.cc....3.......3....cc.cc....3.......3....cc.cc....3.......3....cc.cc....3.......3....cc.cc....3........
            .....cc.cc......................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc......................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc......................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc......................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc......................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc......................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc......................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....22.22......................22.22.................22.22.................22.22.................22.22.................22.22.................22.22.............
            .....e2.2e......................e2.2e.................e2.2e.................e2.2e.................e2.2e.................e2.2e.................e2.2e.............
            ...2222.2222..................2222.2222.............2222.2222.............2222.2222.............2222.2222.............2222.2222.............2222.2222...........
            ...2222.2222..................2222.2222.............2222.2222.............2222.2222.............2222.2222.............2222.2222.............2222.2222...........
            ...ee.e.e.ee..................ee.e.e.ee.............ee.e.e.ee.............ee.e.e.ee.............ee.e.e.ee.............ee.e.e.ee.............ee.e.e.ee...........
            `,img`
            ...bbbbbbbbb.............bbbbbbbbb..................bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb...........
            ...bbbbbbbbb.............bbbbbbbbbcaaaaaaa33........bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb...........
            ...333333333caaaaaaaa....333333333caaaaaaa3.........333333333.............333333333.............333333333.............333333333.............333333333...........
            ...331333133caaaaaaaa....331333133..................331333133.............331333133.............331333133.............331333133.............331333133...........
            ...333333333.......aa....333333333..................333333333.............333333333.............333333333.............333333333.............333333333...........
            ...aaaabaaaaaaa....aa....aaaabaaaaaaa............aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa........
            ...aaaababbaaaa....aa....aaaababbaaaa............aaaaaaababbaaaa.......aaaaaaababbaaaa.......aaaaaaababbaaaa.......aaaaaaababbaaaa.......aaaaaaababbaaaa........
            ...aaaabaaaa.aa....aa....aaaabaaaa.aa............aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...aaaabaaaa.aa....33....aaaabaaaa.aa............aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...aaaabaaaa.aa.....3....aaaabaaaa.aa............aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...aaaabaaaa.aaaaaa33....aaaabaaaa.aaaaaa33......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...eeee4eeee.aaaaaa3.....eeee4eeee.aaaaaa3.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa........
            ...ccccccccc.............ccccccccc...............aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa........
            ...ccccccccc.............ccccccccc...............aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa........
            .....cc.cc................cc....cc...............33...cc.cc...33.......33...cc.cc...33.......33...cc.cc...33.......33...cc.cc...33.......33...cc.cc...33........
            .....cc.cc................cc....cc...............3....cc.cc....3.......3....cc.cc....3.......3....cc.cc....3.......3....cc.cc....3.......3....cc.cc....3........
            .....cc.cc................cc....cc....................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc....................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc....................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc....................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc....................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc....................cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc................cc....cccccc2e2222..........cc.cc.................cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....22.22................22....cccccc222222..........22.22.................22.22.................22.22.................22.22.................22.22.............
            .....e2.2e................e2..........................e2.2e.................e2.2e.................e2.2e.................e2.2e.................e2.2e.............
            ...2222.2222............2222........................2222.2222.............2222.2222.............2222.2222.............2222.2222.............2222.2222...........
            ...2222.2222............2222........................2222.2222.............2222.2222.............2222.2222.............2222.2222.............2222.2222...........
            ...ee.e.e.ee............ee.e........................ee.e.e.ee.............ee.e.e.ee.............ee.e.e.ee.............ee.e.e.ee.............ee.e.e.ee...........
            `,img`
            ...bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb..................bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb...........
            ...bbbbbbbbb.............bbbbbbbbbcaaaaaaa33...bbbbbbbbb..................bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb...........
            ...333333333caaaaaaaa....333333333caaaaaaa3....333333333caaaaaaaa.........333333333.............333333333.............333333333.............333333333...........
            ...331333133caaaaaaaa....331333133.............331333133caaaaaaaa.........331333133.............331333133.............331333133.............331333133...........
            ...333333333.......aa....333333333.............333333333.......aa.........333333333.............333333333.............333333333.............333333333...........
            ...aaaabaaaaaaa....aa....aaaabaaaaaaa..........aaaabaaaaaaa....aa......aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa........
            ...aaaababbaaaa....aa....aaaababbaaaa..........aaaababbaaaa....aa......aaaaaaababbaaaa.......aaaaaaababbaaaa.......aaaaaaababbaaaa.......aaaaaaababbaaaa........
            ...aaaabaaaa.aa....aa....aaaabaaaa.aa..........aaaabaaaa.aa....aa......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...aaaabaaaa.aa....33....aaaabaaaa.aa..........aaaabaaaa.aa....33......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...aaaabaaaa.aa.....3....aaaabaaaa.aa..........aaaabaaaa.aa.....3......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...aaaabaaaa.aaaaaa33....aaaabaaaa.aaaaaa33....aaaabaaaa.aaaaaa33......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...eeee4eeee.aaaaaa3.....eeee4eeee.aaaaaa3.....eeee4eeee.aaaaaa3.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa........
            ...ccccccccc.............ccccccccc.............ccccccccc...............aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa........
            ...ccccccccc.............ccccccccc.............ccccccccc...............aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa........
            .....cc.cc................cc....cc...............cc.cc.................33...cc.cc...33.......33...cc.cc...33.......33...cc.cc...33.......33...cc.cc...33........
            .....cc.cc................cc....cc...............cc.cc.................3....cc.cc....3.......3....cc.cc....3.......3....cc.cc....3.......3....cc.cc....3........
            .....cc.cc................cc....cc...............cc.ccccccccc...............cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc...............cc.ccccccccc...............cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc...............cc........cc...............cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc...............cc........cc...............cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc...............cc........cc...............cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc...............cc........22...............cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc................cc....cccccc2e2222.....cc........2e...............cc.cc.................cc.cc.................cc.cc.................cc.cc.............
            .....22.22................22....cccccc222222.....22........2222.............22.22.................22.22.................22.22.................22.22.............
            .....e2.2e................e2.....................e2........2222.............e2.2e.................e2.2e.................e2.2e.................e2.2e.............
            ...2222.2222............2222...................2222........e.ee...........2222.2222.............2222.2222.............2222.2222.............2222.2222...........
            ...2222.2222............2222...................2222.......................2222.2222.............2222.2222.............2222.2222.............2222.2222...........
            ...ee.e.e.ee............ee.e...................ee.e.......................ee.e.e.ee.............ee.e.e.ee.............ee.e.e.ee.............ee.e.e.ee...........
            `,img`
            ...bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb..................bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb...........
            ...bbbbbbbbb.............bbbbbbbbbcaaaaaaa33...bbbbbbbbb.............bbbbbbbbbcaaaaaaa33........bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb...........
            ...333333333caaaaaaaa....333333333caaaaaaa3....333333333caaaaaaaa....333333333caaaaaaa3.........333333333.............333333333.............333333333...........
            ...331333133caaaaaaaa....331333133.............331333133caaaaaaaa....331333133..................331333133.............331333133.............331333133...........
            ...333333333.......aa....333333333.............333333333.......aa....333333333..................333333333.............333333333.............333333333...........
            ...aaaabaaaaaaa....aa....aaaabaaaaaaa..........aaaabaaaaaaa....aa....aaaabaaaaaaa............aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa........
            ...aaaababbaaaa....aa....aaaababbaaaa..........aaaababbaaaa....aa....aaaababbaaaa............aaaaaaababbaaaa.......aaaaaaababbaaaa.......aaaaaaababbaaaa........
            ...aaaabaaaa.aa....aa....aaaabaaaa.aa..........aaaabaaaa.aa....aa....aaaabaaaa.aa............aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...aaaabaaaa.aa....33....aaaabaaaa.aa..........aaaabaaaa.aa....33....aaaabaaaa.aa............aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...aaaabaaaa.aa.....3....aaaabaaaa.aa..........aaaabaaaa.aa.....3....aaaabaaaa.aa............aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...aaaabaaaa.aaaaaa33....aaaabaaaa.aaaaaa33....aaaabaaaa.aaaaaa33....aaaabaaaa.aaaaaa33......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...eeee4eeee.aaaaaa3.....eeee4eeee.aaaaaa3.....eeee4eeee.aaaaaa3.....eeee4eeee.aaaaaa3.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa........
            ...ccccccccc.............ccccccccc.............ccccccccc.............ccccccccc...............aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa........
            ...ccccccccc.............ccccccccc.............ccccccccc.............ccccccccc...............aa.ccccccccc.aa.......aa.ccccccccc.aa.......aa.ccccccccc.aa........
            .....cc.cc................cc....cc...............cc.cc.................cc.cc.................33...cc.cc...33.......33...cc.cc...33.......33...cc.cc...33........
            .....cc.cc................cc....cc...............cc.cc.................cc.cc.................3....cc.cc....3.......3....cc.cc....3.......3....cc.cc....3........
            .....cc.cc................cc....cc...............cc.ccccccccc..........cc.cc......................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc...............cc.ccccccccc..........cc.cc......................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc...............cc........cc..........cc.cc......................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc...............cc........cc..........cc.cc......................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc...............cc........cc..........cc.cc......................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc...............cc........22..........cc.cc......................cc.cc.................cc.cc.................cc.cc.............
            .....cc.cc................cc....cccccc2e2222.....cc........2e..........cc.cc......................cc.cc.................cc.cc.................cc.cc.............
            .....22.22................22....cccccc222222.....22........2222........22.22......................22.22.................22.22.................22.22.............
            .....e2.2e................e2.....................e2........2222........e2.2e......................e2.2e.................e2.2e.................e2.2e.............
            ...2222.2222............2222...................2222........e.ee......2222.2222..................2222.2222.............2222.2222.............2222.2222...........
            ...2222.2222............2222...................2222..................2222.2222..................2222.2222.............2222.2222.............2222.2222...........
            ...ee.e.e.ee............ee.e...................ee.e..................ee.e.e.ee..................ee.e.e.ee.............ee.e.e.ee.............ee.e.e.ee...........
            `,img`
            ...bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb..................bbbbbbbbb.............bbbbbbbbb...........
            ...bbbbbbbbb.............bbbbbbbbbcaaaaaaa33...bbbbbbbbb.............bbbbbbbbbcaaaaaaa33...bbbbbbbbbcaaaaaaa33........bbbbbbbbb.............bbbbbbbbb...........
            ...333333333caaaaaaaa....333333333caaaaaaa3....333333333caaaaaaaa....333333333caaaaaaa3....333333333caaaaaaa3.........333333333.............333333333...........
            ...331333133caaaaaaaa....331333133.............331333133caaaaaaaa....331333133.............331333133..................331333133.............331333133...........
            ...333333333.......aa....333333333.............333333333.......aa....333333333.............333333333..................333333333.............333333333...........
            ...aaaabaaaaaaa....aa....aaaabaaaaaaa..........aaaabaaaaaaa....aa....aaaabaaaaaaa..........aaaabaaaaaaa............aaaaaaabaaaaaaa.......aaaaaaabaaaaaaa........
            ...aaaababbaaaa....aa....aaaababbaaaa..........aaaababbaaaa....aa....aaaababbaaaa..........aaaababbaaaa............aaaaaaababbaaaa.......aaaaaaababbaaaa........
            ...aaaabaaaa.aa....aa....aaaabaaaa.aa..........aaaabaaaa.aa....aa....aaaabaaaa.aa..........aaaabaaaa.aa............aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...aaaabaaaa.aa....33....aaaabaaaa.aa..........aaaabaaaa.aa....33....aaaabaaaa.aa..........aaaabaaaa.aa............aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...aaaabaaaa.aa.....3....aaaabaaaa.aa..........aaaabaaaa.aa.....3....aaaabaaaa.aa..........aaaabaaaa.aa............aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...aaaabaaaa.aaaaaa33....aaaabaaaa.aaaaaa33....aaaabaaaa.aaaaaa33....aaaabaaaa.aaaaaa33....aaaabaaaa.aaaaaa33......aa.aaaabaaaa.aa.......aa.aaaabaaaa.aa........
            ...eeee4eeee.aaaaaa3.....eeee4eeee.aaaaaa3.....eeee4eeee.aaaaaa3.....eeee4eeee.aaaaaa3.....eeee4eeee.aaaaaa3.......aa.eeee4eeee.aa.......aa.eeee4eeee.aa........
            ...ccccccccc.............ccccccccc.............ccccccccc.............ccccccccc.............ccccccccc...............aa.ccccccccc.aa.......aa.ccccccccc.aa........
            ...ccccccccc.............ccccccccc.............ccccccccc.............ccccccccc.............ccccccccc...............aa.ccccccccc.aa.......aa.ccccccccc.aa........
            .....cc.cc................cc....cc...............cc.cc.................cc.cc................cc....cc...............33...cc.cc...33.......33...cc.cc...33........
            .....cc.cc................cc....cc...............cc.cc.................cc.cc................cc....cc...............3....cc.cc....3.......3....cc.cc....3........
            .....cc.cc................cc....cc...............cc.ccccccccc..........cc.cc................cc....cc....................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc...............cc.ccccccccc..........cc.cc................cc....cc....................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc...............cc........cc..........cc.cc................cc....cc....................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc...............cc........cc..........cc.cc................cc....cc....................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc...............cc........cc..........cc.cc................cc....cc....................cc.cc.................cc.cc.............
            .....cc.cc................cc....cc...............cc........22..........cc.cc................cc....cc....................cc.cc.................cc.cc.............
            .....cc.cc................cc....cccccc2e2222.....cc........2e..........cc.cc................cc....cccccc2e2222..........cc.cc.................cc.cc.............
            .....22.22................22....cccccc222222.....22........2222........22.22................22....cccccc222222..........22.22.................22.22.............
            .....e2.2e................e2.....................e2........2222........e2.2e................e2..........................e2.2e.................e2.2e.............
            ...2222.2222............2222...................2222........e.ee......2222.2222............2222........................2222.2222.............2222.2222...........
            ...2222.2222............2222...................2222..................2222.2222............2222........................2222.2222.............2222.2222...........
            ...ee.e.e.ee............ee.e...................ee.e..................ee.e.e.ee............ee.e........................ee.e.e.ee.............ee.e.e.ee...........
            `,img`
            ...bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb..................bbbbbbbbb...........
            ...bbbbbbbbb.............bbbbbbbbbcaaaaaaa33...bbbbbbbbb.............bbbbbbbbbcaaaaaaa33...bbbbbbbbbcaaaaaaa33...bbbbbbbbbcaaaaaaa33........bbbbbbbbb...........
            ...333333333caaaaaaaa....333333333caaaaaaa3....333333333caaaaaaaa....333333333caaaaaaa3....333333333caaaaaaa3....333333333caaaaaaa3.........333333333...........
            ...331333133caaaaaaaa....331333133.............331333133caaaaaaaa....331333133.............331333133.............331333133..................331333133...........
            ...333333333.......aa....333333333.............333333333.......aa....333333333.............333333333.............333333333..................333333333...........
            ...aaaabaaaaaaa....aa....aaaabaaaaaaa..........aaaabaaaaaaa....aa....aaaabaaaaaaa..........aaaabaaaaaaa..........aaaabaaaaaaa............aaaaaaabaaaaaaa........
            ...aaaababbaaaa....aa....aaaababbaaaa..........aaaababbaaaa....aa....aaaababbaaaa..........aaaababbaaaa..........aaaababbaaaa............aaaaaaababbaaaa........
            ...aaaabaaaa.aa....aa....aaaabaaaa.aa..........aaaabaaaa.aa....aa....aaaabaaaa.aa..........aaaabaaaa.aa..........aaaabaaaa.aa............aa.aaaabaaaa.aa........
            ...aaaabaaaa.aa....33....aaaabaaaa.aa..........aaaabaaaa.aa....33....aaaabaaaa.aa..........aaaabaaaa.aa..........aaaabaaaa.aa............aa.aaaabaaaa.aa........
            ...aaaabaaaa.aa.....3....aaaabaaaa.aa..........aaaabaaaa.aa.....3....aaaabaaaa.aa..........aaaabaaaa.aa..........aaaabaaaa.aa............aa.aaaabaaaa.aa........
            ...aaaabaaaa.aaaaaa33....aaaabaaaa.aaaaaa33....aaaabaaaa.aaaaaa33....aaaabaaaa.aaaaaa33....aaaabaaaa.aaaaaa33....aaaabaaaa.aa............aa.aaaabaaaa.aa........
            ...eeee4eeee.aaaaaa3.....eeee4eeee.aaaaaa3.....eeee4eeee.aaaaaa3.....eeee4eeee.aaaaaa3.....eeee4eeee.aaaaaa3.....eeee4eeee.aa............aa.eeee4eeee.aa........
            ...ccccccccc.............ccccccccc.............ccccccccc.............ccccccccc.............ccccccccc.............ccccccccc.aa............aa.ccccccccc.aa........
            ...ccccccccc.............ccccccccc.............ccccccccc.............ccccccccc.............ccccccccc.............ccccccccc.aa............aa.ccccccccc.aa........
            .....cc.cc................cc....cc...............cc.cc.................cc.cc................cc....cc..............cc....cc.33............33...cc.cc...33........
            .....cc.cc................cc....cc...............cc.cc.................cc.cc................cc....cc..............cc....cc..3............3....cc.cc....3........
            .....cc.cc................cc....cc...............cc.ccccccccc..........cc.cc................cc....cc..............cc....cc....................cc.cc.............
            .....cc.cc................cc....cc...............cc.ccccccccc..........cc.cc................cc....cc..............cc....cc....................cc.cc.............
            .....cc.cc................cc....cc...............cc........cc..........cc.cc................cc....cc..............cc....cc....................cc.cc.............
            .....cc.cc................cc....cc...............cc........cc..........cc.cc................cc....cc..............cc....cc....................cc.cc.............
            .....cc.cc................cc....cc...............cc........cc..........cc.cc................cc....cc..............cc....cc....................cc.cc.............
            .....cc.cc................cc....cc...............cc........22..........cc.cc................cc....cc..............cc....cc....................cc.cc.............
            .....cc.cc................cc....cccccc2e2222.....cc........2e..........cc.cc................cc....cccccc2e2222....cc....cccccc2e2222..........cc.cc.............
            .....22.22................22....cccccc222222.....22........2222........22.22................22....cccccc222222....22....cccccc222222..........22.22.............
            .....e2.2e................e2.....................e2........2222........e2.2e................e2....................e2..........................e2.2e.............
            ...2222.2222............2222...................2222........e.ee......2222.2222............2222..................2222........................2222.2222...........
            ...2222.2222............2222...................2222..................2222.2222............2222..................2222........................2222.2222...........
            ...ee.e.e.ee............ee.e...................ee.e..................ee.e.e.ee............ee.e..................ee.e........................ee.e.e.ee...........
            `,img`
            ...bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb.............bbbbbbbbb...................bbbbbbbbb..........
            ...bbbbbbbbb.............bbbbbbbbbcaaaaaaa33...bbbbbbbbb.............bbbbbbbbbcaaaaaaa33...bbbbbbbbbcaaaaaaa33...bbbbbbbbbcaaaaaaa33.........bbbbbbbbb..........
            ...333333333caaaaaaaa....333333333caaaaaaa3....333333333caaaaaaaa....333333333caaaaaaa3....333333333caaaaaaa3....333333333caaaaaaa3..........333333333..........
            ...331333133caaaaaaaa....331333133.............331333133caaaaaaaa....331333133.............331333133.............331333133...................331333133..........
            ...333333333.......aa....333333333.............333333333.......aa....333333333.............333333333.............333333333...................333333333..........
            ...aaaabaaaaaaa....aa....aaaabaaaaaaa..........aaaabaaaaaaa....aa....aaaabaaaaaaa..........aaaabaaaaaaa..........aaaabaaaaaaa..........aaaaaaaaaabaaaaaaaaaa....
            ...aaaababbaaaa....aa....aaaababbaaaa..........aaaababbaaaa....aa....aaaababbaaaa..........aaaababbaaaa..........aaaababbaaaa..........aaaaaaaaaababbaaaaaaa....
            ...aaaabaaaa.aa....aa....aaaabaaaa.aa..........aaaabaaaa.aa....aa....aaaabaaaa.aa..........aaaabaaaa.aa..........aaaabaaaa.aa..........aa....aaaabaaaa....aa....
            ...aaaabaaaa.aa....33....aaaabaaaa.aa..........aaaabaaaa.aa....33....aaaabaaaa.aa..........aaaabaaaa.aa..........aaaabaaaa.aa..........33....aaaabaaaa....33....
            ...aaaabaaaa.aa.....3....aaaabaaaa.aa..........aaaabaaaa.aa.....3....aaaabaaaa.aa..........aaaabaaaa.aa..........aaaabaaaa.aa..........3.....aaaabaaaa.....3....
            ...aaaabaaaa.aaaaaa33....aaaabaaaa.aaaaaa33....aaaabaaaa.aaaaaa33....aaaabaaaa.aaaaaa33....aaaabaaaa.aaaaaa33....aaaabaaaa.aa................aaaabaaaa..........
            ...eeee4eeee.aaaaaa3.....eeee4eeee.aaaaaa3.....eeee4eeee.aaaaaa3.....eeee4eeee.aaaaaa3.....eeee4eeee.aaaaaa3.....eeee4eeee.aa................eeee4eeee..........
            ...ccccccccc.............ccccccccc.............ccccccccc.............ccccccccc.............ccccccccc.............ccccccccc.aa................ccccccccc..........
            ...ccccccccc.............ccccccccc.............ccccccccc.............ccccccccc.............ccccccccc.............ccccccccc.aa................ccccccccc..........
            .....cc.cc................cc....cc...............cc.cc.................cc.cc................cc....cc..............cc....cc.33..................cc.cc............
            .....cc.cc................cc....cc...............cc.cc.................cc.cc................cc....cc..............cc....cc..3..................cc.cc............
            .....cc.cc................cc....cc...............cc.ccccccccc..........cc.cc................cc....cc..............cc....cc.....................cc.cc............
            .....cc.cc................cc....cc...............cc.ccccccccc..........cc.cc................cc....cc..............cc....cc.....................cc.cc............
            .....cc.cc................cc....cc...............cc........cc..........cc.cc................cc....cc..............cc....cc.....................cc.cc............
            .....cc.cc................cc....cc...............cc........cc..........cc.cc................cc....cc..............cc....cc.....................cc.cc............
            .....cc.cc................cc....cc...............cc........cc..........cc.cc................cc....cc..............cc....cc.....................cc.cc............
            .....cc.cc................cc....cc...............cc........22..........cc.cc................cc....cc..............cc....cc.....................cc.cc............
            .....cc.cc................cc....cccccc2e2222.....cc........2e..........cc.cc................cc....cccccc2e2222....cc....cccccc2e2222...........cc.cc............
            .....22.22................22....cccccc222222.....22........2222........22.22................22....cccccc222222....22....cccccc222222...........22.22............
            .....e2.2e................e2.....................e2........2222........e2.2e................e2....................e2...........................e2.2e............
            ...2222.2222............2222...................2222........e.ee......2222.2222............2222..................2222.........................2222.2222..........
            ...2222.2222............2222...................2222..................2222.2222............2222..................2222.........................2222.2222..........
            ...ee.e.e.ee............ee.e...................ee.e..................ee.e.e.ee............ee.e..................ee.e.........................ee.e.e.ee..........
            `],
        200,
        false
        )
        for (let index = 0; index < 7; index++) {
            music.knock.play()
            pause(200)
        }
        pause(1000)
        animation.runMovementAnimation(
        currentWallSprite,
        "v 20",
        100,
        false
        )
        pause(200)
        music.smallCrash.play()
        scene.cameraShake(2, 200)
        pause(500)
        animation.runMovementAnimation(
        currentWallSprite,
        "v 64",
        1000,
        false
        )
        pause(360)
        scene.cameraShake(2, 200)
        currentWallSprite.setImage(img`
            4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
            4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
            4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
            4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
            4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
            4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
            4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
            4444.................44444...................444.................44444...................444...................444444................444...................44444
            444...................444.....................4...................444.....................4.....................444...................4.....................4444
            444....................44.....................4....................44.....................4.....................44....................4.....................4444
            444.....................4.....................4.....................4.....................4.....................44....................4.....................4444
            444.....................4.....................4.....................4.....................4.....................4.....................4.....................4444
            444.....................4.....................4.....................4.....................4.....................4.....................4.....................4444
            444.....................4....................44.....................4....................44....................44....................444...................44444
            444.......4444444.......4.......444444444444444.......4444444.......4.......444444444444444.......444444444444444........444444444444444444444.......44444444444
            444.......44444444......4.......444444444444444.......44444444......4.......444444444444444.......444444444444444.......4444444444444444444444.......44444444444
            444.......44444444......4.......444444444444444.......44444444......4.......444444444444444.......444444444444444.......4444444444444444444444.......44444444444
            444.......44444444......4.......444444444444444.......44444444......4.......444444444444444.......444444444444444.......4444444444444444444444.......44444444444
            444.......44444444......4............4444444444.......44444444......4............4444444444............4444444444.......4444444444444444444444.......44444444444
            444.......44444444......4.............444444444.......44444444......4.............444444444.............444444444.......4444444444444444444444.......44444444444
            444.......44444444......4.............444444444.......44444444......4.............444444444.............444444444.......4444444444444444444444.......44444444444
            444.......4444444.......4.............444444444.......4444444.......4.............444444444.............444444444.......4444444444444444444444.......44444444444
            444.....................4.............444444444.....................4.............444444444.............444444444.......4444444444444444444444.......44444444444
            444.....................4.............444444444.....................4.............444444444.............444444444.......4444444444444444444444.......44444444444
            444.....................4............4444444444.....................4............4444444444............4444444444.......4444444444444444444444.......44444444444
            444.....................4.......444444444444444....................44.......444444444444444.......444444444444444.......4444444444444444444444.......44444444444
            444....................44.......444444444444444...................444.......444444444444444.......444444444444444.......4444444444444444444444.......44444444444
            444...................444.......444444444444444..................4444.......444444444444444.......444444444444444.......4444444444444444444444.......44444444444
            444..................4444.......444444444444444...................444.......444444444444444.......444444444444444.......4444444444444444444444.......44444444444
            444.......444444444444444.......444444444444444....................44.......444444444444444.......444444444444444.......4444444444444444444444.......44444444444
            444.......444444444444444.......444444444444444.......444444........4.......444444444444444.......444444444444444.......4444444444444444444444.......44444444444
            444.......444444444444444.......444444444444444.......4444444.......4.......444444444444444.......444444444444444........444444444444444444444.......44444444444
            444.......444444444444444....................44.......4444444.......4.......444444444444444....................44....................444444444.......44444444444
            444.......444444444444444.....................4.......4444444.......4.......444444444444444.....................4.....................44444444.......44444444444
            444.......444444444444444.....................4.......4444444.......4.......444444444444444.....................4.....................44444444.......44444444444
            444.......444444444444444.....................4.......4444444.......4.......444444444444444.....................44....................44444444.......44444444444
            444.......444444444444444.....................4.......4444444.......4.......444444444444444.....................44....................44444444.......44444444444
            444.......444444444444444.....................4.......4444444.......4.......444444444444444.....................444...................44444444.......44444444444
            4444.....44444444444444444...................444.....444444444.....444.....44444444444444444...................444444................4444444444.....444444444444
            4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
            `)
        currentWallSprite.z = 1080
        for (let index = 0; index <= 6; index++) {
            for (let index2 = 0; index2 < 4; index2++) {
                mySprite = sprites.create(img`
                    4 4 
                    4 4 
                    `, SpriteKind.Food)
                spriteutils.setVelocityAtAngle(mySprite, spriteutils.degreesToRadians(randint(230, 310)), randint(100, 120))
                mySprite.z = 1090
                mySprite.ay = 500
                mySprite.setFlag(SpriteFlag.AutoDestroy, true)
                mySprite.setFlag(SpriteFlag.Invisible, false)
                mySprite.setPosition(index * 35 + 4 + randint(-5, 5), 30)
            }
        }
        music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 375, 241, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
        pause(640)
        music.bigCrash.play()
        mySprite4 = sprites.create(img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ........................................6666666666666666666...6666666666666666666...6666666666666666666........66666............................................
            .......................................666666666666666666666.666666666666666666666.666666666666666666666......6666666...........................................
            .......................................666666666666666666666.666666666666666666666.666666666666666666666......6666666...........................................
            .......................................666666666666666666666.666666666666666666666.666666666666666666666......6666666...........................................
            .......................................666666666666666666666.666666666666666666666.666666666666666666666......6666666...........................................
            .......................................666666666666666666666.666666666666666666666.666666666666666666666......6666666...........................................
            .......................................66666666666666666666...6666666666666666666...6666666666666666666.......6666666...........................................
            .......................................6666666......................6666666...............6666666.............6666666...........................................
            .......................................6666666......................6666666...............6666666.............6666666...........................................
            .......................................6666666......................6666666...............6666666.............6666666...........................................
            .......................................6666666......................6666666...............6666666.............6666666...........................................
            .......................................666666666666.................6666666...............6666666.............6666666...........................................
            .......................................6666666666666................6666666...............6666666.............6666666...........................................
            .......................................6666666666666................6666666...............6666666.............6666666...........................................
            .......................................6666666666666................6666666...............6666666.............6666666...........................................
            .......................................6666666666666................6666666...............6666666.............6666666...........................................
            .......................................6666666666666................6666666...............6666666.............6666666...........................................
            .......................................666666666666.................6666666...............6666666.............6666666...........................................
            .......................................6666666......................6666666...............6666666.............6666666...........................................
            .......................................6666666......................6666666...............6666666.............6666666...........................................
            .......................................6666666......................6666666...............6666666.............6666666...........................................
            .......................................6666666......................6666666...............6666666.............6666666...........................................
            .......................................6666666......................6666666...............6666666.............6666666...........................................
            .......................................6666666......................6666666...............6666666..............66666............................................
            .......................................6666666......................6666666...............6666666...............................................................
            .......................................6666666................6666666666666666666.........6666666..............66666............................................
            .......................................6666666...............666666666666666666666........6666666.............6666666...........................................
            .......................................6666666...............666666666666666666666........6666666.............6666666...........................................
            .......................................6666666...............666666666666666666666........6666666.............6666666...........................................
            .......................................6666666...............666666666666666666666........6666666.............6666666...........................................
            .......................................6666666...............666666666666666666666........6666666.............6666666...........................................
            ........................................66666.................6666666666666666666..........66666...............66666............................................
            ................................................................................................................................................................
            `, SpriteKind.Player)
        mySprite4.z = 1090
        pause(1500)
        sprites.destroyAllSpritesOfKind(SpriteKind.Player)
        pause(1500)
        textSprite = textsprite.create("3")
        textSprite.setOutline(2, 6)
        textSprite.setMaxFontHeight(32)
        textSprite.setPosition(80, 40)
        for (let index = 0; index <= 2; index++) {
            textSprite.setText("" + (3 - index))
            textSprite.setPosition(80, 40)
            music.playSoundEffect(music.createSoundEffect(
            WaveShape.Sine,
            1500,
            1300,
            128,
            0,
            200,
            SoundExpressionEffect.None,
            InterpolationCurve.Linear
            ), SoundExpressionPlayMode.UntilDone)
            pause(500)
        }
        textSprite.setText("GO!")
        textSprite.setPosition(80, 40)
        music.playSoundEffect(music.createSoundEffect(
        WaveShape.Triangle,
        3000,
        3000,
        255,
        0,
        500,
        SoundExpressionEffect.Vibrato,
        InterpolationCurve.Linear
        ), SoundExpressionPlayMode.UntilDone)
        pause(200)
        textSprite.destroy()
        gameStarted = true
        currentWallSprite.top = 999
    })
}
function makeCrowdCheer (playerIndex: number) {
    for (let value of sprites.allOfKind(SpriteKind.Crowd)) {
        if (value.x < playerIndex * 40 && value.x > (playerIndex - 1) * 40) {
            animation.runMovementAnimation(
            value,
            ["q 0 -15 0 0 q 0 -10 0 0 q 0 -15 0 0", "q 0 -5 0 0 q 0 -8 0 0 q 0 -5 0 0", "q 0 -11 0 0 q 0 -9 0 0 q 0 -11 0 0"]._pickRandom(),
            randint(1000, 1500),
            false
            )
        }
    }
    timer.background(function () {
        music.baDing.play()
    })
}
let crashed = false
let textSprite: TextSprite = null
let mySprite4: Sprite = null
let mySprite: Sprite = null
let mySprite3: Sprite = null
let titleCard: Sprite = null
let gameStarted = false
let tempFreq = 0
let tempImage: Image = null
let tempLimbPositions: number[] = []
let wallImage: Image = null
let currentWallSprite: Sprite = null
let tempSprite: Sprite = null
let Raphaels_Limb_Positions: number[] = []
let Raphaels_Legs: Image[] = []
let Raphaels_Arms: Image[] = []
let Raphaels_Body: Image = null
let Esmereldas_Limb_Positions: number[] = []
let Esmereldas_Legs: Image[] = []
let Esmereldas_Arms: Image[] = []
let Esmereldas_Body: Image = null
let Horatios_limb_positions: number[] = []
let Horatios_Leg: Image[] = []
let Horatios_Arms: Image[] = []
let Horatios_Body: Image = null
let Geraldos_limb_positions: number[] = []
let Geraldos_Legs: Image[] = []
let Geraldos_Arms: Image[] = []
let Geraldos_Body: Image = null
scene.setBackgroundColor(13)
Geraldos_Body = img`
    b b b b b b b b b 
    b b b b b b b b b 
    3 3 3 3 3 3 3 3 3 
    3 3 1 3 3 3 1 3 3 
    3 3 3 3 3 3 3 3 3 
    a a a a b a a a a 
    a a a a b a b b a 
    a a a a b a a a a 
    a a a a b a a a a 
    a a a a b a a a a 
    a a a a b a a a a 
    e e e e 4 e e e e 
    c c c c c c c c c 
    c c c c c c c c c 
    `
Geraldos_Arms = [img`
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . 3 . . . . . . . . . . 
    3 3 a a a a a a a a a a 
    3 3 a a a a a a a a a a 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . 
    . . . . . 3 3 . . . . . 
    . . . . . 3 3 3 . . . . 
    . . . . . a a . . . . . 
    . . . . . a a . . . . . 
    . . . . . a a . . . . . 
    . . . . . a a . . . . . 
    . . . . . a a a a a a a 
    . . . . . a a a a a a a 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . a a a a a a a 
    . . . . . a a a a a a a 
    . . . . . a a . . . . . 
    . . . . . a a . . . . . 
    . . . . . a a . . . . . 
    . . . . . a a . . . . . 
    . . . . . 3 3 3 . . . . 
    . . . . . 3 3 . . . . . 
    . . . . . . . . . . . . 
    `]
Geraldos_Legs = [img`
    . . . . . . . . . . . . . . c c 
    . . . . . . . . . . . . . . c c 
    . . . . . . . . . . . . . . c c 
    . . . . . . . . . . . . . . c c 
    . . . . . . . . . . . . . . c c 
    . . . . . . . . . . . . . . c c 
    . . . . . . . . . . . . . . c c 
    . . . . . . . . . . . . . . c c 
    . . . . . . . . . . . . . . 2 2 
    . . . . . . . . . . . . . . e 2 
    . . . . . . . . . . . . 2 2 2 2 
    . . . . . . . . . . . . 2 2 2 2 
    . . . . . . . . . . . . e e . e 
    `, img`
    2 2 2 2 e 2 c c c c c c c c c c 
    2 2 2 2 2 2 c c c c c c c c c c 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . c c c c c c c c c 
    . . . . . . . c c c c c c c c c 
    . . . . . . . c c . . . . . . . 
    . . . . . . . c c . . . . . . . 
    . . . . . . . c c . . . . . . . 
    . . . . . . . 2 2 . . . . . . . 
    . . . . . . . e 2 . . . . . . . 
    . . . . . 2 2 2 2 . . . . . . . 
    . . . . . 2 2 2 2 . . . . . . . 
    . . . . . e e . e . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `]
Geraldos_limb_positions = [
randint(0, 2),
randint(0, 2),
randint(0, 2),
randint(0, 2)
]
Horatios_Body = img`
    . . 6 6 6 6 6 . . 
    . b 6 2 2 2 6 b . 
    . . 6 6 6 6 6 . . 
    . . 6 6 6 6 6 . . 
    . . 6 6 6 6 6 . . 
    b . . b b b . . b 
    6 6 6 6 6 6 6 6 6 
    6 6 6 b b b 6 6 6 
    6 6 b b b c b 6 6 
    6 6 b b 6 b b 6 6 
    c c c c c c c c c 
    c c c c c c c c c 
    6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 
    `
Horatios_Arms = [img`
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    c c c . . . . . . . . . 
    . c c . 6 6 6 6 6 . . . 
    . . b b 6 6 6 6 6 b b b 
    . . b b 6 6 6 6 6 b b b 
    . c c . 6 6 6 6 6 . . . 
    c c c . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . 
    . . . . c . . . . c . . 
    . . . . c c . . c c . . 
    . . . . c c b b c c . . 
    . . . . . . b b . . . . 
    . . . . . 6 6 6 6 . . . 
    . . . . . 6 6 6 6 . . . 
    . . . . . 6 6 6 6 . . b 
    . . . . . 6 6 6 6 . b b 
    . . . . . . b b . b b b 
    . . . . . . b b b b b . 
    . . . . . . . b b b . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . b b b . . 
    . . . . . . b b b b b . 
    . . . . . . b b . b b b 
    . . . . . 6 6 6 6 . b b 
    . . . . . 6 6 6 6 . . b 
    . . . . . 6 6 6 6 . . . 
    . . . . . 6 6 6 6 . . . 
    . . . . . . b b . . . . 
    . . . . c c b b c c . . 
    . . . . c c . . c c . . 
    . . . . c . . . . c . . 
    . . . . . . . . . . . . 
    `]
Horatios_Leg = [img`
    . . . . . . . . . . . . . . b b 
    . . . . . . . . . . . . . . b b 
    . . . . . . . . . . . . . . b b 
    . . . . . . . . . . . . . . b b 
    . . . . . . . . . . . . . . b b 
    . . . . . . . . . . . . . . b b 
    . . . . . . . . . . . . . 6 6 6 
    . . . . . . . . . . . . . 6 6 6 
    . . . . . . . . . . . . . 6 6 6 
    . . . . . . . . . . . . . 6 6 6 
    . . . . . . . . . . . 6 6 6 6 6 
    . . . . . . . . . . 6 6 6 6 6 6 
    . . . . . . . . . . c c c c c c 
    `, img`
    c 6 6 6 6 6 6 b b b b b b b b b 
    c 6 6 6 6 6 6 b b b b b b b b b 
    c 6 6 6 6 6 6 . . . . . . . . . 
    c 6 6 . . . . . . . . . . . . . 
    c 6 6 . . . . . . . . . . . . . 
    c 6 . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . b b 
    . . . . . . . . . . b b b b b b 
    . . . . . . . . . b b b b b b . 
    . . . . . . . . . b b . . . . . 
    . . . . . . . . . b b . . . . . 
    . . . . . . . . 6 6 6 . . . . . 
    . . . . . . . . 6 6 6 . . . . . 
    . . . . . . . . 6 6 6 . . . . . 
    . . . . . . . . 6 6 6 . . . . . 
    . . . . . . 6 6 6 6 6 . . . . . 
    . . . . . 6 6 6 6 6 6 . . . . . 
    . . . . . c c c c c c . . . . . 
    . . . . . . . . . . . . . . . . 
    `]
Horatios_limb_positions = [
Geraldos_limb_positions[0],
Geraldos_limb_positions[1],
Geraldos_limb_positions[2],
Geraldos_limb_positions[3]
]
Esmereldas_Body = img`
    . . 2 2 2 2 2 . . 
    . 2 2 2 2 2 2 2 . 
    . 2 1 2 2 2 1 2 . 
    . 2 2 2 2 2 2 2 . 
    . . 2 2 c 2 2 . . 
    2 . . 2 2 2 . . 2 
    2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 
    . 2 2 2 2 2 2 2 . 
    . 2 2 2 2 2 2 2 . 
    . 2 2 2 2 2 2 2 . 
    2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 
    `
Esmereldas_Arms = [img`
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . 2 2 . . . . . . . . 
    . 2 2 . . . . . . . . . 
    . b 2 . . . . . . . . . 
    . b 2 2 2 2 . . . . . . 
    . b b 2 2 2 2 . . . . . 
    . . b b 2 2 2 2 2 2 2 2 
    . . . b b b b 2 2 2 2 2 
    . . . . . . b b b b b b 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . b b b 2 2 . 
    . . . . . b b 2 2 2 . . 
    . . . . b b 2 2 . . . . 
    . . . b b 2 2 . . . . . 
    . . . b b 2 2 . . . 2 2 
    . . . . b 2 2 2 . 2 2 2 
    . . . . b b 2 2 2 2 2 2 
    . . . . . b b 2 2 2 b . 
    . . . . . . . b b b . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . 2 2 2 2 2 
    . . . . . . 2 2 2 2 2 2 
    . . . . . 2 2 2 b b b b 
    . . . . 2 2 2 b b b b b 
    . . . . 2 2 2 b b . . . 
    . . . . 2 2 b b . . . . 
    . . . . 2 2 b b . . . . 
    . . 2 2 2 b b . . . . . 
    . . b b b . . . . . . . 
    . . . . . . . . . . . . 
    `]
Esmereldas_Legs = [img`
    . . . . . . . . . . . . . 2 2 2 
    . . . . . . . . . . . . 2 2 b b 
    . . . . . . . . . . . . 2 2 b . 
    . . . . . . . . . . . . 2 2 b . 
    . . . . . . . . . . . . 2 2 b . 
    . . . . . . . . . . . . . 2 b . 
    . . . . . . . . . . . . . 2 2 b 
    . . . . . . . . . . . . . 2 2 b 
    . . . . . . . . . . . . 2 2 b b 
    . . . . . . . . . . . . 2 2 b b 
    . . . . . . . . . . 2 2 2 2 b . 
    . . . . . . . . . 2 2 2 b b b . 
    . . . . . . . . . b b b b . . . 
    `, img`
    . . . . . . 2 2 2 2 2 2 2 2 2 2 
    . . . . 2 2 2 2 2 2 2 2 2 2 2 b 
    . . 2 2 2 2 2 2 b b b b b b b . 
    . 2 2 b b b b b b . . . . . . . 
    2 2 b b b . . . . . . . . . . . 
    2 b b . . . . . . . . . . . . . 
    2 b . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . 2 2 2 2 b 
    . . . . . . . . . . 2 2 2 2 b b 
    . . . . . . . . 2 2 2 2 b b b . 
    . . . . . . . 2 2 2 b b b . . . 
    . . . . . . . 2 2 b b . . . . . 
    . . . . . . . 2 2 b . . . . . . 
    . . . . . . . 2 b . . . . . . . 
    . . . . . . 2 2 b . . . . . . . 
    . . . . . 2 2 b . . . . . . . . 
    . . b 2 2 2 b . . . . . . . . . 
    . . b b b b . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `]
Esmereldas_Limb_Positions = [
Geraldos_limb_positions[0],
Geraldos_limb_positions[1],
Geraldos_limb_positions[2],
Geraldos_limb_positions[3]
]
Raphaels_Body = img`
    . . e e e e e . . 
    . e e e e e e e . 
    . e b b b b b e . 
    . b b 1 b 1 b b . 
    . b b b b b b b . 
    7 7 7 7 7 7 7 7 7 
    6 6 6 6 6 6 6 6 6 
    7 7 7 7 7 7 7 7 7 
    6 6 6 6 6 6 6 6 6 
    7 7 7 7 7 7 7 7 7 
    6 6 6 6 6 6 6 6 6 
    7 7 7 7 7 7 7 7 7 
    8 8 8 5 5 5 8 8 8 
    8 8 8 8 8 8 8 8 8 
    `
Raphaels_Arms = [img`
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . b . . . . . . . . . . 
    b b b b b b b b b 7 7 6 
    b b b b b b b b b 7 7 6 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . 
    . . . . . b b . . . . . 
    . . . . . b b b . . . . 
    . . . . . b b . . . . . 
    . . . . . b b . . . . . 
    . . . . . b b . . . . . 
    . . . . . b b . . . . . 
    . . . . . b b b b 7 7 6 
    . . . . . b b b b 7 7 6 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . . . . . . . . 
    . . . . . b b b b 7 7 6 
    . . . . . b b b b 7 7 6 
    . . . . . b b . . . . . 
    . . . . . b b . . . . . 
    . . . . . b b . . . . . 
    . . . . . b b . . . . . 
    . . . . . b b b . . . . 
    . . . . . b b . . . . . 
    . . . . . . . . . . . . 
    `]
Raphaels_Legs = [img`
    . . . . . . . . . . . . . . 8 8 
    . . . . . . . . . . . . . . 8 8 
    . . . . . . . . . . . . . . 8 8 
    . . . . . . . . . . . . . . b b 
    . . . . . . . . . . . . . . b b 
    . . . . . . . . . . . . . . b b 
    . . . . . . . . . . . . . e e e 
    . . . . . . . . . . . . . 2 e e 
    . . . . . . . . . . . . . e e e 
    . . . . . . . . . . . . . 2 e e 
    . . . . . . . . . . . e e e e e 
    . . . . . . . . . . e e e e e e 
    . . . . . . . . . . e e e e e e 
    `, img`
    e e e e e e b b b b b 8 8 8 8 8 
    e e e e e e b b b b b 8 8 8 8 8 
    e e 2 e 2 e . . . . . . . . . . 
    e e . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . b b b b b 8 8 8 8 
    . . . . . . . b b b b b 8 8 8 8 
    . . . . . . . b b . . . . . . . 
    . . . . . . e e e . . . . . . . 
    . . . . . . 2 e e . . . . . . . 
    . . . . . . e e e . . . . . . . 
    . . . . . . 2 e e . . . . . . . 
    . . . . e e e e e . . . . . . . 
    . . . e e e e e e . . . . . . . 
    . . . e e e e e e . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `]
Raphaels_Limb_Positions = [
Geraldos_limb_positions[0],
Geraldos_limb_positions[1],
Geraldos_limb_positions[2],
Geraldos_limb_positions[3]
]
info.player2.setScore(0)
info.player1.setScore(0)
info.player3.setScore(0)
info.player4.setScore(0)
let mySprite2 = sprites.create(img`
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    55555555555555555555d55555555555555555555d55555555555ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    fffffffff1fffffffff1fffffffffff1ffffffff1fffffffffffdfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    fffffffff1fffffffff1fffffffffff1ffffffff1ffffffffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    fffffffff1ffffffff1ffffffffffff1ffffffff1ffffffffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    fffffffff1ff1fffff1ffffffffffff11fffffff1fffffffffdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    fffffffff1ff1fffff1ffffffffffff1f1fffff1ffffffffffdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    ffffffff1fff1fffff1ffffffffffff1ff1ffff1ffffffffffdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    ffffffff1ffff1fffdfffffffffffff1ff1ffff1ffffffffffdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    ffffffff1ffff1fffdffffffffffff1ffff1fff1fffffffffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    ffffffff1ffff1fffdffffffffffff1fffff1ff1ffffffffffffdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    ffffffff1fffff1ffdffffffffffff1ffffff11ffffffffffffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    fffffff1ffffff1ffdfffffffffffdffffffff1ffffffffffffffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    555555555555555d5d55555555555d5555555555555555555555555555dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    `, SpriteKind.Food)
for (let row = 0; row <= 2; row++) {
    for (let col = 0; col <= 15; col++) {
        if (Math.percentChance(90)) {
            tempSprite = makeCrowdParticipant(6 + 10 * col)
            tempSprite.bottom = 8 + 12 * row
            tempSprite.x = 6 + 10 * col
        }
    }
}
makeTitleCard()
game.onUpdate(function () {
    if (gameStarted) {
        if (!(currentWallSprite) || currentWallSprite.top > scene.screenHeight()) {
            spawnWall()
        } else if (currentWallSprite.bottom >= 107 && currentWallSprite.z == 0) {
            currentWallSprite.z = 10
            currentWallSprite.ay = 100
            crashed = false
            if (arraysAreEqual(tempLimbPositions, Geraldos_limb_positions)) {
                info.player1.changeScoreBy(1)
                makeCrowdCheer(1)
            } else {
                for (let index = 0; index < 2; index++) {
                    mySprite = sprites.create(img`
                        4 4 
                        4 4 
                        `, SpriteKind.Food)
                    spriteutils.setVelocityAtAngle(mySprite, spriteutils.degreesToRadians(randint(230, 310)), randint(100, 120))
                    mySprite.ay = 500
                    mySprite.setFlag(SpriteFlag.AutoDestroy, true)
                    mySprite.setFlag(SpriteFlag.Invisible, true)
                    mySprite.setPosition(20, 87)
                    mySprite.startEffect(effects.confetti2)
                }
                crashed = true
            }
            if (arraysAreEqual(tempLimbPositions, Horatios_limb_positions)) {
                info.player2.changeScoreBy(1)
                makeCrowdCheer(2)
            } else {
                for (let index = 0; index < 2; index++) {
                    mySprite = sprites.create(img`
                        4 4 
                        4 4 
                        `, SpriteKind.Food)
                    spriteutils.setVelocityAtAngle(mySprite, spriteutils.degreesToRadians(randint(230, 310)), randint(100, 120))
                    mySprite.ay = 500
                    mySprite.setFlag(SpriteFlag.AutoDestroy, true)
                    mySprite.setFlag(SpriteFlag.Invisible, true)
                    mySprite.setPosition(60, 87)
                    mySprite.startEffect(effects.confetti2)
                }
                crashed = true
            }
            if (arraysAreEqual(tempLimbPositions, Esmereldas_Limb_Positions)) {
                info.player3.changeScoreBy(1)
                makeCrowdCheer(3)
            } else {
                for (let index = 0; index < 2; index++) {
                    mySprite = sprites.create(img`
                        1 1 
                        1 1 
                        `, SpriteKind.Food)
                    spriteutils.setVelocityAtAngle(mySprite, spriteutils.degreesToRadians(randint(230, 310)), randint(100, 120))
                    mySprite.ay = 500
                    mySprite.setFlag(SpriteFlag.AutoDestroy, true)
                    mySprite.setFlag(SpriteFlag.Invisible, true)
                    mySprite.setPosition(100, 87)
                    mySprite.startEffect(effects.confetti2)
                }
                crashed = true
            }
            if (arraysAreEqual(tempLimbPositions, Raphaels_Limb_Positions)) {
                info.player4.changeScoreBy(1)
                makeCrowdCheer(4)
            } else {
                for (let index = 0; index < 2; index++) {
                    mySprite = sprites.create(img`
                        4 1 
                        1 4 
                        `, SpriteKind.Food)
                    spriteutils.setVelocityAtAngle(mySprite, spriteutils.degreesToRadians(randint(230, 310)), randint(100, 120))
                    mySprite.ay = 500
                    mySprite.setFlag(SpriteFlag.AutoDestroy, true)
                    mySprite.setFlag(SpriteFlag.Invisible, true)
                    mySprite.setPosition(140, 87)
                    mySprite.startEffect(effects.confetti2)
                }
                crashed = true
            }
            wallImage.replace(4, 15)
            renderGuy(15, 13, Geraldos_Body, Geraldos_Arms, Geraldos_Legs, Geraldos_limb_positions, wallImage)
            renderGuy(55, 13, Horatios_Body, Horatios_Arms, Horatios_Leg, Horatios_limb_positions, wallImage)
            renderGuy(95, 13, Esmereldas_Body, Esmereldas_Arms, Esmereldas_Legs, Esmereldas_Limb_Positions, wallImage)
            renderGuy(135, 13, Raphaels_Body, Raphaels_Arms, Raphaels_Legs, Raphaels_Limb_Positions, wallImage)
            for (let index = 0; index <= 13; index++) {
                wallImage.replace(index + 1, 0)
            }
            wallImage.replace(15, 4)
            if (crashed) {
                scene.cameraShake(4, 200)
                music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 375, 241, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
            } else {
                timer.background(function () {
                    music.baDing.play()
                })
            }
        }
    }
})
