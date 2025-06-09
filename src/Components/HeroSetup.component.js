import React, { useState } from 'react';
import VikingStore from '../Store/Viking.store';
import StorageUtil from '../Util/Storage.Util';

function HeroSetup({ onComplete }) {
    const currentName = VikingStore(state => state.name);
    const currentClass = VikingStore(state => state.class);
    const setName = VikingStore(state => state.setName);
    const setClass = VikingStore(state => state.setClass);

    const [name, setNameLocal] = useState(currentName);
    const [heroClass, setClassLocal] = useState(currentClass);

    const handleSubmit = (e) => {
        e.preventDefault();
        setName(name);
        setClass(heroClass);
        StorageUtil.set('heroName', name);
        StorageUtil.set('heroClass', heroClass);
        if (onComplete) onComplete();
    };

    return (
        <div className="hero-setup-container">
            <form onSubmit={handleSubmit} className="hero-setup-form">
                <div>
                    <label>
                        Hero Name:
                        <input value={name} onChange={(e) => setNameLocal(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Class:
                        <input value={heroClass} onChange={(e) => setClassLocal(e.target.value)} />
                    </label>
                </div>
                <button type="submit">Start Adventure</button>
            </form>
        </div>
    );
}

export default HeroSetup;
