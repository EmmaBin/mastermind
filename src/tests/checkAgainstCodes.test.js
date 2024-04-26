import checkAgainstCodes from "../utils/checkAgainstCodes";


describe("return correct numbers and locations", () => {
    it("should return 4 correct number and 4 correct locations", async () => {

        const mockGuess = [1, 2, 3, 4]
        const mockCode = [1, 2, 3, 4]

        const result = await checkAgainstCodes(mockCode, mockGuess)

        expect(result).toEqual({ "correctLocation": 4, "correctNumber": 4 })
    })


    it("should return 0 for correct numbers and locations", async () => {

        const mockGuess = [5, 6, 7, 8]
        const mockCode = [1, 2, 3, 4]

        const result = await checkAgainstCodes(mockCode, mockGuess)

        expect(result).toEqual({ "correctLocation": 0, "correctNumber": 0 })
    })


    it("should handle arrays with duplicate numbers", async () => {

        const mockGuess = [1, 1, 2, 2]
        const mockCode = [1, 2, 3, 4]

        const result = await checkAgainstCodes(mockCode, mockGuess)

        expect(result).toEqual({ "correctLocation": 1, "correctNumber": 2 })
    })
    it("should detect all correct numbers but in the wrong positions", async () => {
        const mockGuess = [4, 3, 2, 1]
        const mockCode = [1, 2, 3, 4]
        const result = await checkAgainstCodes(mockCode, mockGuess);
        expect(result).toEqual({ "correctLocation": 0, "correctNumber": 4 });
    });



})