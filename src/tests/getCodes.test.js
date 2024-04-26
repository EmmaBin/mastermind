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
})


