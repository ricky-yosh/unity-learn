using UnityEngine;

[AddComponentMenu("Day-Night Cycle/Sun Rotation")]
public class SunRotation : MonoBehaviour
{
    [Tooltip("Total seconds for a complete day-night cycle")]
    public float secondsInFullDay = 120.0f;
    
    [Tooltip("What time of day to start (0-1 where 0 = dawn, 0.25 = noon, 0.5 = dusk, 0.75 = midnight)")]
    [Range(0, 1)]
    public float timeOfDay = 0.25f;
    
    [Tooltip("The axis to rotate around")]
    public Vector3 rotationAxis = new Vector3(1, 0, 0);
    
    [Tooltip("Continue cycle automatically")]
    public bool autoRotate = true;
    
    // Internal tracking variables
    private float currentTimeOfDay = 0.25f;
    private float timeScale;

    void Start()
    {
        // Initialize with Inspector value
        currentTimeOfDay = timeOfDay;
        
        // Calculate time scale
        timeScale = 1.0f / secondsInFullDay;
        
        // Set initial rotation
        UpdateRotation();
    }

    void Update()
    {
        if (autoRotate)
        {
            // Update time of day
            currentTimeOfDay += timeScale * Time.deltaTime;
            
            // Ensure time of day loops between 0-1
            if (currentTimeOfDay >= 1.0f)
                currentTimeOfDay -= 1.0f;
                
            // Update the light's rotation
            UpdateRotation();
        }
    }
    
    void UpdateRotation()
    {
        // Calculate rotation angle (360 degrees for a full day)
        float rotationAngle = currentTimeOfDay * 360.0f;
        
        // Apply rotation around the specified axis
        transform.rotation = Quaternion.AngleAxis(rotationAngle, rotationAxis);
    }
    
    // This allows changing the time of day from other scripts
    public void SetTimeOfDay(float time)
    {
        currentTimeOfDay = Mathf.Clamp01(time);
        UpdateRotation();
    }
    
    // This makes the field update in the inspector during play mode
    void OnValidate()
    {
        // Update time scale if seconds in full day is changed
        if (Application.isPlaying)
            timeScale = 1.0f / secondsInFullDay;
            
        // Update current time if timeOfDay is changed in inspector
        if (timeOfDay != currentTimeOfDay)
        {
            currentTimeOfDay = timeOfDay;
            UpdateRotation();
        }
    }
}