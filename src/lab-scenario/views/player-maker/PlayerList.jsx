import React from 'react';

const PlayerList = (props) => {
  console.log('props:', props)
  return (
    <>
    <section className='accept-container flex-container center'>
      <button className='accept-player' onClick={props.onClick}>Accept Player</button>
    </section>
    <section className='player-list flex-container row'>
      {props.list.map((player, idx) => {
        console.log(player)
        return <div className='player-list-item' key={player.seed.index}>
          {/* <p>id : {player.seed.index}</p> */}
          {/* <p>rare : {player.seed.rare}</p> */}
          <div className='player-list-item-avatar'>
            <img src={player.avatarURI}></img>
          </div>
          <div className='player-list-item-data'>
            {Object.keys(player.data).map(property => 
              <div className='property' key={property}>
                <span className='property-name'>{property}: </span>
                <span className={`property-numerical ${getPropertyNumberColor(~~player.data[property])}`}>{~~player.data[property]}</span>
              </div>
            )}
          </div>
          <div className='player-list-item-info'>
            {player.info.class}
          </div>
          <div className='player-list-item-trait'></div>
          <div className='player-list-item-menu'>
            <button className='delete' onClick={() => props.deleteItem(idx)}>+</button>
          </div>
          {/* <div className='player-list-item-seed'></div> */}
        </div> 
      })}
    </section>
    </>
  );
}

const getPropertyNumberColor = (number) => {
  const rules = [
    /** minium, maxium, color */
    [0,  9,  'terrible'],
    [10, 19, 'noob'],
    [20, 39, 'normal'],
    [40, 49, 'good'],
    [50, 59, 'expert'],
    [60, 69, 'elite'],
    [70, 79, 'master'],
    [80, 89, 'legend'],
    [90, 99, 'epic'],
    [100, 119, 'relic'],
    [120, 1000, 'invincible'],
  ]
  for (const rule of rules) {
    if (rule[0] <= number && number <= rule[1]) {
      return rule[2]
    }
  }
}
export default PlayerList;
