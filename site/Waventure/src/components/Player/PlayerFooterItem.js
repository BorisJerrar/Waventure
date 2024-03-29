import React from 'react'

export default function PlayerFooterItem({title, element, setElement, setLearnMore, setLastElement}) {

    const showElement = () => {
        setLastElement(false);
        setLearnMore(false);
        setElement(!element);
      };
    return (
        <p onClick={showElement} style={element?{borderBottom: 'solid 2px #a487b3', color: '#fff'}:{borderBottom: 'none'}} className="playerFooterItem">
        {title}
      </p>
    )
}
