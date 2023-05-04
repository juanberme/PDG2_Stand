import { render } from '@testing-library/react';
import {useRef, useEffect} from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { cleanUpScene, mountScene } from './script';

//import { mountScene } from './Script';

const Model3D = () => {
    const mountRef = useRef(null);
    useEffect(() => {

        //inicializar escena
        mountScene(mountRef);
        
        return () => {
            //borrar escena
            cleanUpScene();
        }; 
        
    }, []);
  return (
    <div ref={mountRef} style={{width: "100%", height: "100vh"}}>
        
    </div>
  )
}

export default Model3D