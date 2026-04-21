import { useGSAP } from '@gsap/react'
import { useAnimations, useGLTF, useHelper, useTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import * as THREE from "three"
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { materialAO } from 'three/tsl'

const Model = ({ animate, Texture1, setTexture1, setTexture2, Texture2, setanimate }) => {
    const ModelRef = useRef()

    const model = useGLTF("/models/dog.drc.glb")
    const { camera, gl, scene } = useThree()

    // Scene Adjustment
    useEffect(() => {
        camera.position.set(0, -.3, 2) // camera.rotateY(-Math.PI/9)
        gl.toneMapping = THREE.ReinhardToneMapping
        gl.outputColorSpace = THREE.SRGBColorSpace
    }, [camera, gl])

    // Animation
    const { actions } = useAnimations(model.animations, model.scene)
    useEffect(() => {
        actions['Take 001'].play()
    }, [actions])


    // Textures
    const matcaps = (useTexture([
        "/textures/matcap/mat-1.png",
        "/textures/matcap/mat-2.png",
        "/textures/matcap/mat-3.png",
        "/textures/matcap/mat-4.png",
        "/textures/matcap/mat-5.png",
        "/textures/matcap/mat-6.png",
        "/textures/matcap/mat-7.png",
        "/textures/matcap/mat-8.png",
        "/textures/matcap/mat-9.png",
        "/textures/matcap/mat-10.png",
        "/textures/matcap/mat-11.png",
        "/textures/matcap/mat-12.png",
        "/textures/matcap/mat-13.png",
        "/textures/matcap/mat-14.png",
        "/textures/matcap/mat-15.png",
        "/textures/matcap/mat-16.png",
        "/textures/matcap/mat-17.png",
        "/textures/matcap/mat-18.png",
        "/textures/matcap/mat-19.png",
        "/textures/matcap/mat-20.png",
    ]))
    useEffect(() => {
        matcaps.forEach((child) => {
            child.colorSpace = THREE.SRGBColorSpace
            child.needsUpdate = true
        });
    },[matcaps])


    const textures = useTexture({
        normalMap: '/textures/dog_normals.jpg',
        map: '/textures/dog_specular.jpg'
    })
    textures.normalMap.flipY = false

    const eye_textures = useTexture({
        normalMap: '/eye.jpeg',
    })
    // Model Parts Selection
    const model_body = model.scene.children[0].children[1].children[0].children[0]
    const model_l_eye = model.scene.children[0].children[1].children[1].children[0].children[2].children[0].children[0].children[5]
    const model_r_eye = model.scene.children[0].children[1].children[1].children[0].children[2].children[0].children[0].children[6]


    // Applying Textures
    const dogMaterial = useRef()

    if (!dogMaterial.current) {
        dogMaterial.current = new THREE.MeshMatcapMaterial({
            matcap: matcaps[1],
            normalMap: textures.normalMap
        })
        dogMaterial.current.onBeforeCompile = onBeforeCompile
        model_body.material = dogMaterial.current
    }
    model_r_eye.material = new THREE.MeshMatcapMaterial({
        normalMap: eye_textures.normalMap,
        map: textures.map,
    })
    model_l_eye.material = new THREE.MeshMatcapMaterial({
        normalMap: eye_textures.normalMap,
        map: textures.map,
    })

    const material = useRef({
        uMatcap1: { value: matcaps[Texture1 - 1] },
        uMatcap2: { value: matcaps[Texture1 - 1] },
        uProgress: { value: 1.0 }
    })
    function onBeforeCompile(shader) {
        shader.uniforms.uMatcapTexture1 = material.current.uMatcap1
        shader.uniforms.uMatcapTexture2 = material.current.uMatcap2
        shader.uniforms.uProgress = material.current.uProgress

        shader.fragmentShader = shader.fragmentShader.replace(
            "void main() {",
            `uniform sampler2D uMatcapTexture1;
             uniform sampler2D uMatcapTexture2;
             uniform float uProgress;

             void main() {
            `
        )

        shader.fragmentShader = shader.fragmentShader.replace(
            "vec4 matcapColor = texture2D( matcap, uv );",
            `
            vec4 matcapColor1 = texture2D( uMatcapTexture1, uv );
            vec4 matcapColor2 = texture2D( uMatcapTexture2, uv );
            float transitionFactor = 0.2;

            float sweep = (vViewPosition.x + 1.0) * 0.5;
            
            float progress = smoothstep(
            uProgress - transitionFactor,
            uProgress,
            sweep
            );

            vec4 matcapColor = mix(matcapColor1, matcapColor2, progress);
        `
        )
    }


    // GSAP
    // useEffect(()=>{
    //     if(animate!=true){return}
    //     gsap.to(material.current.uProgress,{
    //         value: 0.0,
    //         duration: 0.35,
    //         ease: 'power2.inOut',
    //         onComplete:()=>{
    //             setanimate(false)
    //             setTexture2(Texture1)
    //             // setTexture1()
    //             // material.current.uMatcap2.value=material.current.uMatcap1.value
    //             material.current.uProgress.value=1.0
    //             // material.current.uProgress
    //         }
    //     })
    // })
    useEffect(() => {
        if (!animate) return

        gsap.killTweensOf(material.current.uProgress)

        // update target texture
        material.current.uMatcap2.value = matcaps[Texture2 - 1]

        // reset progress
        material.current.uProgress.value = 1.0

        gsap.to(material.current.uProgress, {
            value: 0.0,
            duration: 0.35,
            ease: 'power2.inout',
            onComplete: () => {
                setanimate(false)
                
            }
        })
    }, [animate, Texture2])

    gsap.registerPlugin(ScrollTrigger)
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#HTMLPortion',
                endTrigger: '#HTMLPortion',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            }
        })
        tl.to(ModelRef.current.rotation, {
            y: '+=0.3',
        }, 'start')
        tl.to(ModelRef.current.position, {
            z: -0.7,
            ease: 'power1.out' 
        }, 'start')
        tl.to(ModelRef.current.rotation, {
            x: '+=0.3'
        }, 'middle')
        tl.to(ModelRef.current.position, {
            y: -1.7,
            x: -0.4,
            z: -0.7
        }, 'end')
        tl.to(ModelRef.current.rotation, {
            y: -Math.PI * 0.8
        }, 'end')
    })

    return (
        <>
            <primitive ref={ModelRef} object={model.scene} rotation={[Math.PI / 21, Math.PI / 4.7, -Math.PI / 14]} scale={3.4} position={[0.34, -2.4, .6]} />
            <directionalLight intensity={10} position={[0, 5, 5]} />
        </>
    )
}

export default Model