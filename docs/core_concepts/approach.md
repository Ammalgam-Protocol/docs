---
sidebar_position: 6
---

# Approach

To address these issues, Ammalgam has designed a tiered approach which intensifies to handle these death spirals as markets turn violent and subside during normal market conditions.  There are 4 levels of protection against the impact of market death spirals:

- Allowing deposits of each asset individually to be lent out
- Lending limit threshold
- Three tier lending utilization rate increases
- Dynamic swap pricing

### Allowing Deposits of Individual Assets for Lending and Collateral

First, we have designed our contract to allow users to deposit assets $X$ and $Y$ individually for the sole purpose of being lent out. Allowing deposits gives the market an additional way to respond by supplying liquidity as utilization peaks during bumpy market conditions. Since lending rates increase based on the percentage of assets lent out, high borrowing demand would spike interest rates as an assets approach depletion. This encourages the market to respond by both supplying the asset as well as incentivize borrowers to repay their debts. This is a common approach that is sufficient in money market protocols and will be effective for the majority of market conditions.

### Lending Limit Threshold

If markets conditions are not normal, lending rate increases may not be sufficient incentives to maintain sustainable reserves. The next protective measure will be a limit of what can be lent out. By only allowing 90% of assets to be borrowed, we create a buffer at which lending of the scarce asset stops and only swaps can utilize what remains. In our interest rate tier model, 90% lending utilization would correspond to 100% utilization in standard money market protocols. Under these conditions, lending rates would reach 40% annualized. This limit ensures that lending can not wipe out all of the liquidity and ensure that swaps can execute even if demand for borrowing assets in the pair contract have become aggressive. 

### Three Tier Lending Utilization Rate Increase

If 40% yield rates are still not bringing liquidity back to the pair, the market is really starting to unwind. At this stage the FUD is catching on and there may even be enough market momentum to lead to cascading liquidations and forced selling. But, it’s probably too early to call it a death spiral. The protocol has already stopped borrowing for the scarce asset, but more trades are taking it than bringing it. As these trades continue to take out liquidity, we introduce a third interest rate tier. Money market protocols use a two tier model. The first slowly increases rates as borrow utilization goes from 0% to some sweet spot, typically 80%. After this, rates start to increase faster between the sweet spot and 100% utilization. Our third tier allows for a third, more aggressive, rate increase once a reserve’s health is at risk. Now each trade taking liquidity is noticeably raising interest rates further increasing the pain of borrowing and enticing what would be otherwise bystanders to jump in with liquidity to yield a high rate. Once rates surpass 100, 200, 500% annualized, it is hard to imagine the market not noticing and stepping in to relieve the pressure.

<iframe src="https://www.desmos.com/calculator/1e6ddjclat?embed"
  frameBorder="0"
  allowFullScreen
  width="100%"
  height="600"
></iframe> 

If this mechanism is still failing to stop the flow of liquidity out of the pair contract, the market is likely experiencing a death spiral. Interest rates might become completely meaningless. At this stage our mechanism design now needs to be ready for anything. The next response is designed to maintain sufficient liquidity to continue to fill swaps when no one is willing to provide liquidity or repay loans and the bountiful asset in the contract is going to zero and the market is violently trying to secure as much of the scarce asset as it can.

Some things that need to be considered here is that our tranche tracking assumes liquidity across unmodified curves. There are incentives in the depleted asset protection for anyone who is returning liquidity when the curve diverges down the modified path. The potential conflicts here are the incentives are ineffective and a number of liquidations or worse a cascade of liquidations become possible without sufficient liquidity to support them. 