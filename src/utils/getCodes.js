export default async function getCodes(counts) {

    try {
        const response = await fetch(`https://www.random.org/integers/?num=${counts}&min=0&max=7&col=1&base=10&format=plain&rnd=new`);
        //get string format
        const data = await response.text();
        if (data.includes("Error:")) {

            return null
        }
        console.log(data.split("\n").slice(0, counts))
        return data.split("\n").slice(0, counts)
    } catch (err) {
        return null
    }
}