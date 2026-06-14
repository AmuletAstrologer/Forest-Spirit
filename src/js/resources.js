import { ScreenElement, ImageSource, Loader } from "excalibur";

// voeg hier jouw eigen resources toe
const Resources = {
    //Game UI
    Background: new ImageSource('images/background.png'),
    Heart: new ImageSource('images/heart.png'), 
    Coin: new ImageSource('images/coin.png'),
    Platform: new ImageSource('images/platform.png'), 

    //Player
    PlayerIdle: new ImageSource('images/Wizard_Pack/Idle.png'),
    PlayerRun: new ImageSource('images/Wizard_Pack/Run.png'),
    PlayerJump: new ImageSource('images/Wizard_Pack/Jump.png'),
    PlayerFall: new ImageSource('images/Wizard_Pack/Fall.png'),
    PlayerAttack1: new ImageSource('images/Wizard_Pack/Attack1.png'),
    PlayerAttack2: new ImageSource('images/Wizard_Pack/Attack2.png'),
    PlayerHit: new ImageSource('images/Wizard_Pack/Hit.png'),
    PlayerDeath: new ImageSource('images/Wizard_Pack/Death.png'),

    // Enemy
    EnemyIdle: new ImageSource('images/Slime/Slime_Spiked_Idle.png'),
    EnemyJump: new ImageSource('images/Slime/Slime_Spiked_Jump.png'),
    EnemyJumpEffect: new ImageSource('images/Slime/Slime_Spiked_Jump_FX.png'),
    EnemyHit: new ImageSource('images/Slime/Slime_Spiked_Hit.png'),
    EnemyDeath: new ImageSource('images/Slime/Slime_Spiked_Death.png'),
    EnemyRun: new ImageSource('images/Slime/Slime_Spiked_Run.png'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }