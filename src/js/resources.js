import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Player } from './player/player'

// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('images/background.png'),
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
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }