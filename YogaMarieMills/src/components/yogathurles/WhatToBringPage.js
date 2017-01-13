import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';

class WhatToBringPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <div className="mdl-grid dark-color bg-color">
                <div className="ribbon bright-bg-color">
                    <div id="about" div className="mdl-card container m-t-30 m-b-30 mdl-shadow--4dp">
                        <div className="featured clearfix text-center">
                            <h1>What to Bring?</h1>
                            <div className="row p-b-15 m-b-30">
                                <div className="col-xs-offset-1 col-xs-10">
                                    <div className="col-xs-12 text-left">

                                        <h3 className="text-center">What to bring to Yoga with Marie Mills?</h3>
                                        <ul>
                                            <li>
                                                <p>You will need to wear comfortable loose clothing, such as track suit pants and t-shirt.
                                                A small bottle of water.</p>
                                            </li>
                                            <li>
                                                <p>A blanket or towel in the winter to provide warmth for the relaxation and meditation.</p>
                                            </li>
                                            <li>
                                                <p>An open mind and awareness to just this moment.</p>
                                            </li>

                                            <h3 className="text-center">The Yoga room on Baker street, Thurles, provides</h3>
                                            <li>
                                                <p>Yoga mats are available in the room (however you are encouraged to bring your own for your comfort and hygeine.).</p>
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
                                        <h3 className="text-center">Inquiries are welcome. Please contact Marie at 086-1778369</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WhatToBringPage;


