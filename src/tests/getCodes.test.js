import getCodes from "../utils/getCodes";

describe("fetch codes from API", () => {
    it("should get codes for easy level", async () => {
        const counts = 4
        const mockData = "1234\n4567\n7890\n1234"
        global.fetch = jest.fn().mockResolvedValueOnce({
            text: jest.fn().mockResolvedValueOnce(mockData)
        })

        const result = await getCodes(counts)

        expect(result).toEqual(['1234', '4567', '7890', '1234'])
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`https://www.random.org/integers/?num=${counts}&min=0&max=7&col=1&base=10&format=plain&rnd=new`);
    })

    it("should get codes for medium level", async () => {
        const counts = 5
        const mockData = "12345\n45675\n78905\n12345"
        global.fetch = jest.fn().mockResolvedValueOnce({
            text: jest.fn().mockResolvedValueOnce(mockData)
        })

        const result = await getCodes(counts)

        expect(result).toEqual(['12345', '45675', '78905', '12345'])
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`https://www.random.org/integers/?num=${counts}&min=0&max=7&col=1&base=10&format=plain&rnd=new`);
    })

    it("should get codes for hard level", async () => {
        const counts = 6
        const mockData = "123466\n456766\n789066\n123466"
        global.fetch = jest.fn().mockResolvedValueOnce({
            text: jest.fn().mockResolvedValueOnce(mockData)
        })

        const result = await getCodes(counts)

        expect(result).toEqual(['123466', '456766', '789066', '123466'])
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`https://www.random.org/integers/?num=${counts}&min=0&max=7&col=1&base=10&format=plain&rnd=new`);
    })
    it("should return null to handle error", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce("API Error")

        const result = await getCodes(5)

        expect(result).toEqual(null)
        expect(fetch).toHaveBeenCalledWith('https://www.random.org/integers/?num=5&min=0&max=7&col=1&base=10&format=plain&rnd=new');

    })


})


