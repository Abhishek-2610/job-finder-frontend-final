import React from 'react';
import { Audio } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='flex justify-center items-center h-screen' style={{ marginTop: '-50px' }}>
            <Audio
                height={80}
                width={80}
                color='#5f27c7'
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor='#5f27c7'
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
    );
};

export default Loader;