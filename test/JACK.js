const { expect } = require("chai");

describe("Jack Token contract", function () {
    it("Simple deployment", async function () {
        const [owner] = await ethers.getSigners();
        const jackToken = await ethers.deployContract("JACK");
        expect(await jackToken.owner()).to.equal(owner.address);
    });

    it("Mint", async function () {
        const [owner] = await ethers.getSigners();

        const jackToken = await ethers.deployContract("JACK");
        await jackToken.mint(
            owner.address,
            ethers.parseUnits("10000", "ether")
        );

        const ownerBalance = await jackToken.balanceOf(owner.address);
        expect(await jackToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Mint Error", async function () {
        const [owner] = await ethers.getSigners();

        const jackToken = await ethers.deployContract("JACK");

        await expect(
            jackToken.mint(
                owner.address,
                ethers.parseUnits("1000000001", "ether")
            )
        ).to.be.reverted;
    });
});
