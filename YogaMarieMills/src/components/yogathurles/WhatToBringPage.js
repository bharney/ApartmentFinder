import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';

class WhatToBringPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <div className="mdl-grid dark-color bg-color">
                <div className="ribbon bg-image-landing b-border">
                    <div className="container m-t-30 m-b-30">
                        <h1 className="text-center color-white">What to Bring?</h1>
                        <div className="row p-b-15 m-b-30">

                            <div className="col-xs-offset-1 col-xs-10 p-b-15 m-b-30">
                                <div className="mdl-card mdl-shadow--4dp p-l-30 p-r-30">
                                    <h3 className="text-center">What to bring to Yoga with Marie Mills?</h3>
                                    <hr />
                                    <ul className="mdl-list p-20">
                                        <li className="vertical-center">
                                            <span><i className="icon-contain mdl-shadow--4dp clothing bright-bg-color"></i></span>
                                            <p>You will need to wear comfortable loose clothing, such as track suit pants and t-shirt.</p>
                                        </li>
                                        <li className="vertical-center">
                                            <span><i className="icon-contain mdl-shadow--4dp yogamat bg-color-purple"></i></span>
                                            <p>We strongly suggest you bring your own Yoga mat.</p>
                                        </li>
                                        <li className="vertical-center">
                                            <span><i className="icon-contain mdl-shadow--4dp waterbottle bg-color-pink"></i></span>
                                            <p>Its recommended that you bring small bottle of water.</p>
                                        </li>
                                        <li className="vertical-center">
                                            <span><i className="icon-contain mdl-shadow--4dp towel bg-color-yellow"></i></span>
                                            <p>If you sweat we suggest a towel. Or in the winter, a blanket to provide warmth for the relaxation and meditation.</p>
                                        </li>
                                        <li className="vertical-center">
                                            <span><i className="icon-contain mdl-shadow--4dp mind bg-color-green"></i></span>
                                            <p>An open mind and awareness to just this moment.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-xs-offset-1 col-xs-10">
                                <div className="mdl-card mdl-shadow--4dp text-left">
                                    <h3 className="text-center">The Yoga room on Baker street, Thurles, provides</h3>
                                    <ul className="mdl-list p-20 p-l-30">
                                        <li>
                                            <p>Yoga mats are available in the room (however you are encouraged to bring your own for your comfort and hygeine).</p>
                                        </li>
                                        <li>
                                            <p>bolsters for meditation, mindfulness and relaxation.</p>
                                        </li>
                                        <li>
                                            <p>optional chairs for mindful Yoga for those who need more support.</p>
                                        </li>
                                        <li>
                                            <p>blankets are available.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                        <h3 className="text-center">Inquiries are welcome. Please contact Marie at 086-1778369</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default WhatToBringPage;


