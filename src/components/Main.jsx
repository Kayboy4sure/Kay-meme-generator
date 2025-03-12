import { useState, useEffect } from "react"

export default function Main() {
    const [meme, setMeme] = useState({
        topText:'One does not simply',
        bottomText:'Walk into Mordor',
        imageUrl:'http://i.imgflip.com/1bij.jpg',
    })

    const [memeimg, setMemeimg] = useState({})

    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(response => setMemeimg(response.data.memes))
    }, [])

    function HandleChange(event) {
        const value = event.target.value
        const name = event.target.name
        console.log(value, name);
        setMeme((prevmeme)=>{
            const newmeme = {...prevmeme};
            newmeme[name] = value;
            return newmeme
        })
    }

    function GenerateMeme() {
        console.log(memeimg);
        const randomno = Math.floor((Math.random()*99) + 1);
        const newmemeimg = memeimg[randomno].url;
        setMeme((prevmeme)=>({...prevmeme, imageUrl:newmemeimg}))
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="e.g One does not simply"
                        value={meme.topText}
                        name="topText"
                        onChange={HandleChange}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="e.g Walk into Mordor"
                        value={meme.bottomText}
                        name="bottomText"
                        onChange={HandleChange}
                    />
                </label>
                <button onClick={GenerateMeme}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}