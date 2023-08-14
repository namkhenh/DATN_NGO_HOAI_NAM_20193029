import { Overlay } from '@fluentui/react'
import React from 'react'
import './Loading.scss'
export default function LoadingPage() {
    let loadingDots: JSX.Element[] = [];
    for (let index = 0; index < 9; index++) {
        loadingDots.push(<span key={index}></span>);
    }
    return (
      <Overlay style={{ backgroundColor: 'transparent', zIndex: 1000009 }}>
          <div className="loading">
              <div className={`loadingdot`}>
                  <div className={`loadingdot-hint`}>
                      Vui lòng đợi...
                  </div>
                  <div id="glegion">
                      <div id="loading_dot" className="loadingdot-dot">
                          {loadingDots}
                      </div>
                  </div>
              </div>
          </div>
      </Overlay>
  )
}
