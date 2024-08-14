
import { configureStore  } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { uiSlice } from "./ui/uiSlice";
import { branchSlice } from "./admin/branchSlice";
import { usersSlice } from "./admin/userSlice";
import { statusBranchSlice } from "./admin/statusBranchSlice";
import { incomeTypeSlice } from "./admin/incomeTypeSlice";
import { incomeSlice } from "./admin/incomeSlice";
import { providerSlice } from "./admin/providerSlice";
import { measureFuelSlice } from "./admin/measureFuelSlice";
import { fuelTypeSlice } from "./admin/fuelTypeSlice";
import { purchaseFuelSlice } from "./admin/purchaseFuelSlice";
import { purchaseFuelResumeSlice } from "./admin/purchaseFuelResumeSlice";
import { pumpSlice } from "./admin/pumpSlice";
import { statusPumpSlice } from "./admin/statusPumpSlice";
import { fuelPumpSlice } from "./admin/fuelPumpSlice";
import { fuelPriceSlice } from "./admin/fuelPriceSlice";
import { saleFuelSlice } from "./admin/saleFuelSlice";
import { lastFuelPriceSlice } from "./admin/lastFuelPrice";
import { dailyClosingSlice } from "./admin/dailyClosingSlice";

 
 
export const store = configureStore ({
     reducer:{
         auth: authSlice.reducer,
         ui:uiSlice.reducer,
         branch: branchSlice.reducer,
         users:usersSlice.reducer,
         statusbranch: statusBranchSlice.reducer,
         incomeType: incomeTypeSlice.reducer,
         income: incomeSlice.reducer,
         provider: providerSlice.reducer,
         measureFuel:measureFuelSlice.reducer,
         fuelType:fuelTypeSlice.reducer,
         purchaseFuel:purchaseFuelSlice.reducer,
         purchaseFuelResume: purchaseFuelResumeSlice.reducer,
         pump: pumpSlice.reducer,
         statuspump:statusPumpSlice.reducer,
         fuelPump:fuelPumpSlice.reducer,
         fuelPrice:fuelPriceSlice.reducer,
         saleFuel: saleFuelSlice.reducer,
         latestFuelPrice:lastFuelPriceSlice.reducer,
         dailyClosing:dailyClosingSlice.reducer
     }
});

