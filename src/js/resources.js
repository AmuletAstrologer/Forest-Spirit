import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('images/background.png'),
    //Player
    PlayerIdle: new ImageSource('images/Wizard_Pack/Idle.png'),
    PlayerRun: new ImageSource('images/Wizard_Pack/Run.png'),

    // Enemy
    EnemyIdle: new ImageSource('images/Slime/Slime_Spiked_Idle.png'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }