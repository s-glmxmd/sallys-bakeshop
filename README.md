# sallys-bakeshop
Mosaic Backend technical project

### Short answer questions

1. Explain at a high level how you selected your approach for redistributing the orders across the bakers' sechedules? Did you consider other approaches?
I did not have time to complete this functionality but if I did I would approach it like this:
Adding an order:
    - Get the current availabilities of the bakers from the bakerSchedule list
    - Calculate the total of hours that the bakers have booked already in adition to the new order
    - If the total is > 32 (assuming we only have 4 bakers) then an error is returned
    - Otherwise:
        - Split the orders randomly among each baker
        * if the total isn't divisible by 4 then I would randomly assign one baker with more work than the others assuming there is no difference between their productivity
Removing an order:
    - Get the sum of the total workload for each baker and subtract the duration of the canceled order
    - Split the orders randomly among each baker
    * same condition as above

2. How would you handle decentralization of the queue, specifically considering the situation where multiple jobs were submitted at the same time?
I would probably use a fcfs approach for job scheduling in this context considering there isn't a need to prioritize the different orders nor is there a baker who would be considered less efficient than others. 
If that were the case I would attribute a weight of efficiency to each baker
Then a weight of importance to each job
Then match the baker with the highest efficiency to the most important job until the job queue is emptied. This would be quite a lot for a little bakery but in theory that's how I would work through it.

3. If workers had different productivities, how would that factor into your approach?
I would start by attributing a weight of efficiency to each baker in the schedule.
Then when it's time to distribute for a new order I would start approach it the same way but give the more productive bakers more orders than the less productive ones.