import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PortalEntryForm from "../components/PortalEntryForm";
import Loader from "../components/Loader";
import { submitPortalEntry } from "../store/reducers/api/asynthunk/portalEntryAsyncThunk";
import { resetPortalEntryState } from "../store/reducers/portalEntryReducer";
import { getAllListing } from "../store/reducers/api/asynthunk/listingAsyncThunk";
import type { AppDispatch, RootState } from "../store/store";
import type{ PortalEntryFormData } from "../store/reducers/api/schema/portalEntrySchema";

const PortalEntryPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Get portal entry state from Redux store
  const { isSubmitting, error, validationErrors } = useSelector(
    (state: RootState) => state.portalEntryReducer
  );

  // Handle form submission with validation and API call
  const handleFormSubmit = async (data: PortalEntryFormData) => {
    console.log("Portal Entry Data:", data);

    try {
      // Dispatch portal entry submission
      const result = await dispatch(submitPortalEntry(data));

      // Check if submission was successful
      if (submitPortalEntry.fulfilled.match(result)) {
        // Show success notification
        toast.success("🎉 Item reported successfully!");

        // Reset portal entry state
        dispatch(resetPortalEntryState());

        // Refresh listings to show the new entry
        dispatch(getAllListing());

        // Navigate to home page after successful submission
        setTimeout(() => {
          navigate("/home");
        }, 1000); // Small delay to show success message
      }
    } catch (error) {
      // Error handling is managed by the async thunk
      console.error("Portal entry submission failed:", error);
    }
  };

  // Handle validation errors and API errors
  useEffect(() => {
    if (error) {
      // Show general error notification
      toast.error(`❌ ${error}`);
    }

    // Show validation errors if any
    if (validationErrors && validationErrors.length > 0) {
      validationErrors.forEach((validationError: any) => {
        if (validationError.message) {
          toast.error(`❌ ${validationError.message}`);
        }
      });
    }
  }, [error, validationErrors]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      dispatch(resetPortalEntryState());
    };
  }, [dispatch]);

  // Show loader during submission
  if (isSubmitting) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <PortalEntryForm onSubmit={handleFormSubmit} isLoading={isSubmitting} />
      <Footer />
    </div>
  );
};

export default PortalEntryPage;
