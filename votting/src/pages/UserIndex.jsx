import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import "./UserIndex.css";

const UserIndex = () => {
  const [user, setUser] = useState(null);
  const [candidateData, setCandidateData] = useState(
    Array(16).fill({ name: "", image: null, symbolImage: null })
  );
  const [userExists, setUserExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.username) {
      axios
        .get(
          `https://digitaldemomachine.com/backend/check_user.php?username=${user.username}`
        )
        .then((response) => {
          console.log("API Response:", response.data);
          if (response.data.status === "success") {
            setUserExists(true);
            setUserData(response.data);
          } else {
            setUserExists(false);
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
          setUserExists(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    axios
      .get(
        "https://digitaldemomachine.com/backend/check_session-user.php",
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.logged_in) {
          setUser(res.data.user);
        } else {
          navigate("/user-login");
        }
      })
      .catch((error) => {
        console.error("Error fetching session", error);
        navigate("/user-login");
      });
  }, [navigate]);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...candidateData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setCandidateData(updatedData);
  };

  const handleSubmit = async (index) => {
    const candidate = candidateData[index];
    if (!candidate.name || !candidate.image || !candidate.symbolImage) {
      alert("Please fill all fields for this candidate.");
      return;
    }

    // Determine the correct value for button_checked
    let buttonCheckedValue = 0; // Default: "बटन दबाएँ" checked = 0
    if (candidate.noChecked) {
      buttonCheckedValue = 1; // If "No" is checked, store 1
    }

    // Collect the form data and files
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("candidate_name", candidate.name);
    formData.append("candidate_image", candidate.image);
    formData.append("candidate_symbol_image", candidate.symbolImage);
    formData.append("candidate_index", index + 1);
    formData.append("button_checked", buttonCheckedValue); // Store corrected checkbox value

    try {
      const response = await axios.post(
        "https://digitaldemomachine.com/backend/save_candidate.php",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.status === "error") {
        alert("Error: " + response.data.message);
      } else if (response.data.status === "success") {
        alert("Candidate added successfully");
        // Update state without reloading the page
        const updatedCandidates = [...candidateData];
        updatedCandidates[index] = { ...candidate, exists: true };
        setCandidateData(updatedCandidates);
      }
    } catch (error) {
      console.error("Error submitting candidate data:", error);
      alert("An error occurred while submitting the candidate data.");
    }
  };

  // Fetch Candidates
  const baseImageUrl =
    "https://digitaldemomachine.com/backend/uploads/";

  useEffect(() => {
    if (user && user.id) {
      fetch(
        `https://digitaldemomachine.com/backend/fetch_candidates.php?user_id=${user.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            const updatedCandidates = Array(16).fill({
              name: "",
              image: null,
              symbolImage: null,
              exists: false,
              noChecked: false, // Default state
              buttonChecked: false, // Default state
            });

            Object.entries(data.candidates).forEach(([index, candidate]) => {
              updatedCandidates[parseInt(index)] = {
                ...candidate,
                image: baseImageUrl + candidate.image,
                symbolImage: baseImageUrl + candidate.symbolImage,
                exists: true,
                noChecked: candidate.buttonChecked === 1, // No checked if buttonChecked is 1
                buttonChecked: candidate.buttonChecked === 0, // Button checked if buttonChecked is 0
              };
            });

            setCandidateData(updatedCandidates);
          }
        })
        .catch((error) => console.error("Error fetching candidates:", error));
    }
  }, [user]);

  // Update Candidate
  const handleUpdate = async (index) => {
    const candidate = candidateData[index];

    if (!candidate.name || !candidate.image || !candidate.symbolImage) {
      alert("Please fill all fields for this candidate.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("candidate_name", candidate.name);

    if (candidate.image) {
      formData.append("candidate_image", candidate.image);
    }
    if (candidate.symbolImage) {
      formData.append("candidate_symbol_image", candidate.symbolImage);
    }
    formData.append("candidate_index", index + 1);

    try {
      const response = await axios.post(
        "https://digitaldemomachine.com/backend/update_candidate.php",
        formData,
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        alert("Candidate updated successfully");

        // Refresh the page immediately after the alert
        window.location.reload();
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error updating candidate data:", error);
      alert("An error occurred while updating the candidate data.");
    }
  };

  const handleDelete = async (index) => {
    if (!window.confirm("Are you sure you want to delete this candidate?")) {
      return;
    }

    try {
      const response = await axios.post(
        "https://digitaldemomachine.com/backend/delete_candidate.php",
        { user_id: user.id, candidate_index: index + 1 },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        alert("Candidate deleted successfully");

        // Remove candidate from the UI without refreshing the page
        const updatedCandidates = [...candidateData];
        updatedCandidates[index] = {
          name: "",
          image: null,
          symbolImage: null,
          exists: false,
          noChecked: false,
          buttonChecked: false,
        };
        setCandidateData(updatedCandidates);
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error deleting candidate:", error);
      alert("An error occurred while deleting the candidate.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Dashboard</h2>
        </div>
        <ul className="sidebar-links">
          <li>
            <Link to={`/${user.username}/user-index`}>
              <FaTachometerAlt className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to={`/${user.username}`}>
              <FaSignOutAlt className="mr-2" />
              Logout
            </Link>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <div className="dashboard-header">
          <h2>Welcome, {user.username}</h2>
        </div>

        <div className="candidate-table">
          <h3>Candidate List</h3>
          <table className="candidate-table">
            <thead>
              <tr>
                <th>अ.क्र</th>
                <th>उम्मीदवार का नाम</th>
                <th>उम्मीदवार की इमेजिस</th>
                <th>चुनाव चिन्ह की इमेज</th>
                <th>Button</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {candidateData.map((candidate, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>
                    <input
                      type="text"
                      value={candidate.name || ""}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                      placeholder="नाम दर्ज करें"
                    />
                  </td>
                  <td>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleInputChange(index, "image", e.target.files[0])
                      }
                    />
                    {candidate.image && (
                      <img
                        src={candidate.image}
                        alt="Candidate image"
                        width="50"
                        height="50"
                      />
                    )}
                  </td>
                  <td>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "symbolImage",
                          e.target.files[0]
                        )
                      }
                    />
                    {candidate.symbolImage && (
                      <img
                        src={candidate.symbolImage}
                        alt="Election Symbol"
                        width="50"
                        height="50"
                      />
                    )}
                  </td>
                  {/* Two checkboxes for "No" and "बटन दबाएँ" */}
                  <td>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          checked={candidate.noChecked}
                          onChange={() =>
                            handleInputChange(
                              index,
                              "noChecked",
                              !candidate.noChecked
                            )
                          }
                        />
                        No
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={candidate.buttonChecked}
                          onChange={() =>
                            handleInputChange(
                              index,
                              "buttonChecked",
                              !candidate.buttonChecked
                            )
                          }
                        />
                        बटन दबाएँ
                      </label>
                    </div>
                  </td>
                  <td>
                    {candidate.exists ? (
                      <>
                        <button
                          className="action-btn btn btn-warning"
                          onClick={() => handleUpdate(index)}
                        >
                          Update
                        </button>
                        <button
                          className="action-btn btn btn-danger d-flex align-items-center mt-3"
                          onClick={() => handleDelete(index)}
                        >
                          <FaTrash className="me-2" />
                        </button>
                      </>
                    ) : (
                      <button
                        className="action-btn btn btn-primary"
                        onClick={() => handleSubmit(index)}
                      >
                        Submit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserIndex;
